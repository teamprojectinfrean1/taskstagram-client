import TaskTicket from "@/components/TaskManagement/TaskTicket";
import NewTask from "@/components/TaskManagement/NewTask";
import TaskModal from "@/components/TaskManagement/TaskModal";
import { useState } from "react";
import { Grid, Box, Typography, Pagination } from "@mui/material";
import Task from "@/models/Task";
import { useRecoilValue } from "recoil";
import { selectedProjectState } from "@/stores/Store";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getTaskList,
  deleteOneTask,
  createOneTask,
  replaceOneTask,
  CreateTaskRequest,
  ReplaceTaskRequest,
} from "@/apis/TaskApi";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const TaskPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>();
  const [currentPage, setCurrentPage] = useState(1);
  const selectedProject = useRecoilValue(selectedProjectState);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ["getTaskList", selectedProject, currentPage],
    () =>
      getTaskList({
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
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getTaskList"] });
    },
    //추후 실패시 동작되는 로직도 추가 예정
  });

  const createMutation = useMutation({
    mutationFn: createOneTask,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getTaskList"] });
    },
    //추후 실패시 동작되는 로직도 추가 예정
  });

  const replaceMutation = useMutation({
    mutationFn: replaceOneTask,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getTaskList"] });
    },
    //추후 실패시 동작되는 로직도 추가 예정
  });

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
      deleteMutation.mutate(task.taskId);
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

  return (
    <div>
      <Grid container direction="column" spacing={1} p={5}>
        <Typography
          variant="h5"
          sx={{
            borderBottom: "1px solid black",
            width: "65px",
            fontWeight: "bold",
          }}
        >
          TASK
        </Typography>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ height: "100%", minHeight: "450px", m: 1 }}
        >
          {currentPage === 1 && (
            <Grid item xs={12} md={3}>
              <NewTask
                onClick={setSelectedTask}
                onShowTaskModal={setShowModal}
              ></NewTask>
            </Grid>
          )}
          {data?.taskList && data.taskList.length > 0
            ? data.taskList.map((task) => (
                <Grid item xs={12} md={3} key={task.taskId}>
                  <TaskTicket
                    key={task.taskId}
                    selectedTask={task}
                    onDelete={deleteTask}
                    onShowTaskModal={setShowModal}
                    onSelectedTask={setSelectedTask}
                  />
                </Grid>
              ))
            : null}
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default TaskPage;
