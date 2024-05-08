import TaskTicket from "@/components/TaskManagement/TaskTicket";
import NewTask from "@/components/TaskManagement/NewTask";
import TaskModal from "@/components/TaskManagement/TaskModal";
import { useEffect, useState } from "react";
import { Grid, Box, Typography, Pagination } from "@mui/material";
import { useRecoilValue } from "recoil";
import { selectedProjectState } from "@/stores/projectStore";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getPaginatedTaskList,
  deleteOneTask,
  createOneTask,
  replaceOneTask,
  CreateTaskRequest,
  ReplaceTaskRequest,
} from "@/apis/TaskApi";
import SkeletonTaskTicket from "@/components/TaskManagement/SkeletonTaskTicket";
import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import Spinner from "@/components/Spinner";
import OneFormModal from "@/components/OneFormModal";

const TaskPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>();
  const [currentPage, setCurrentPage] = useState(1);
  const selectedProject = useRecoilValue(selectedProjectState);
  const [showDeleteFormModal, setShowDeleteFormModal] = useState(false);

  const { data, isLoading, refetch } = useQuery(
    ["getTaskList", selectedProject, currentPage],
    () =>
      getPaginatedTaskList({
        page: currentPage,
        size: currentPage === 1 ? 7 : 8,
        projectId: selectedProject !== null ? selectedProject.projectId : null,
      }),
    {
      enabled: !!selectedProject && !!selectedProject.projectId,
    }
    //추후 실패시 동작되는 로직도 추가 예정
  );

  const deleteMutation = useMutation({
    mutationFn: deleteOneTask,
  });

  const createMutation = useMutation({
    mutationFn: createOneTask,
  });

  const replaceMutation = useMutation({
    mutationFn: replaceOneTask,
  });

  useFeedbackHandler({
    isError: createMutation.isError,
    errorMessage:
      "테스크를 저장하는 중 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.",
    isSuccess: createMutation.isSuccess,
    successMessage: "테스크를 저장했습니다.",
  });

  useFeedbackHandler({
    isError: replaceMutation.isError,
    errorMessage:
      "테스크를 수정하는 중 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.",
    isSuccess: replaceMutation.isSuccess,
    successMessage: "테스크를 수정했습니다.",
  });

  useFeedbackHandler({
    isError: deleteMutation.isError,
    errorMessage:
      "테스크를 삭제하는 중 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.",
    isSuccess: deleteMutation.isSuccess,
    successMessage: "테스크를 삭제했습니다.",
  });

  useEffect(() => {
    if (
      (createMutation.isSuccess && createMutation.isSuccess === true) ||
      (replaceMutation.isSuccess && replaceMutation.isSuccess === true) ||
      (deleteMutation.isSuccess && deleteMutation.isSuccess === true)
    ) {
      refetch();
      handleCloseTaskModal();
    }
  }, [
    createMutation.isSuccess,
    replaceMutation.isSuccess,
    deleteMutation.isSuccess,
  ]);

  const addTask = (request: CreateTaskRequest) => {
    if (request !== null) {
      createMutation.mutate(request);
    }
  };

  const replaceTask = (request: ReplaceTaskRequest) => {
    if (request !== null) {
      replaceMutation.mutate(request);
    }
  };

  const deleteTask = (task: Task) => {
    if (task !== null && task.taskId) {
      setSelectedTask(task);
      setShowDeleteFormModal(true);
    }
  };

  const handleCloseTaskModal = () => {
    setShowModal(false);
    //전체 task select하는 api 호출 후 setTaskList();
  };

  const handlePaginationChange = (
    e: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleConfirmModal = (inputText: string) => {
    if (selectedTask && selectedTask.taskId) {
      deleteMutation.mutate(selectedTask.taskId);
      setShowDeleteFormModal(false);
      handleCloseTaskModal();
    }
  };

  return (
    <div>
      <Grid container direction="column" spacing={1} p={5}>
        <Typography
          variant="h5"
          sx={{
            borderBottom: "1px solid black",
            width: "73px",
            fontWeight: "bold",
          }}
        >
          테스크
        </Typography>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ height: "100%", minHeight: "450px", m: 1 }}
        >
          {isLoading === true ? (
            Array.from(Array(8)).map((_, index) => (
              <Grid item xs={12} md={3} key={index}>
                <SkeletonTaskTicket></SkeletonTaskTicket>
              </Grid>
            ))
          ) : (
            <>
              {/* 에러 처리 필요 */}
              {currentPage === 1 && (
                <Grid item xs={12} md={3}>
                  <NewTask
                    onClick={setSelectedTask}
                    onShowTaskModal={setShowModal}
                  ></NewTask>
                </Grid>
              )}
              {data?.taskList &&
                data.taskList.length > 0 &&
                data.taskList.map((task) => (
                  <Grid item xs={12} md={3} key={task.taskId}>
                    <TaskTicket
                      key={task.taskId}
                      selectedTask={task}
                      onDelete={deleteTask}
                      onShowTaskModal={setShowModal}
                      onSelectedTask={setSelectedTask}
                    />
                  </Grid>
                ))}
            </>
          )}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", m: 3 }}>
          <Pagination
            count={data?.toalTaskpage}
            page={currentPage}
            onChange={handlePaginationChange}
            shape="rounded"
          />
        </Box>
      </Grid>
      <TaskModal
        selectedTask={selectedTask as Task}
        isOpen={showModal}
        onAdd={addTask}
        onReplace={replaceTask}
        onDelete={deleteTask}
        onCloseModal={handleCloseTaskModal}
      ></TaskModal>
      {(createMutation.isLoading ||
        replaceMutation.isLoading ||
        deleteMutation.isLoading) && <Spinner centerInViewport size={70} />}
      {selectedTask && selectedTask.taskId !== null && (
        <OneFormModal
          isOpen={showDeleteFormModal}
          title={"테스크 삭제"}
          contentName={selectedTask.taskTitle ?? ""}
          contentText={
            "테스크를 정말 삭제하시겠습니까? 테스크명을 입력후 삭제 버튼을 눌러주세요."
          }
          invalidText={"올바른 테스크명을 입력해주세요."}
          handleConfirm={handleConfirmModal}
          handleModalClose={() => setShowDeleteFormModal(false)}
        ></OneFormModal>
      )}
    </div>
  );
};

export default TaskPage;
