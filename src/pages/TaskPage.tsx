import Task from "@/components/TaskManagement/Task";
import NewTask from "@/components/TaskManagement/NewTask";
import TaskModal from "@/components/TaskManagement/TaskModal";
import { useState, useEffect } from "react";
import { Grid, Box, Typography, Pagination } from "@mui/material";
import TaskObj from "@/models/TaskObj";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedProjectState } from "@/stores/Store";
import { useQuery } from "react-query";
import { getTaskList } from "@/apis/TaskApi";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const TaskPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskObj | null>();
  const [currentPage, setCurrentPage] = useState(1);
  const selectedProject = useRecoilValue(selectedProjectState);

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

  //util에 주입예정
  const replaceItemAtIndex = (
    arr: TaskObj[],
    index: number,
    newValue: TaskObj
  ) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  };

  //util에 주입예정
  const removeItemAtIndex = (arr: TaskObj[], index: number) => {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  };

  const addTask = (task: TaskObj) => {
    //setTaskList((oldTaskList) => [...oldTaskList, task]);
    //해당 task create하는 api 호출로 대체 예정
    //setCurrentPage();
  };

  const replaceTask = (previousTask: TaskObj, newTask: TaskObj) => {
    //onst index = taskList.findIndex((listItem) => listItem === previousTask);
    //const newList = replaceItemAtIndex(taskList, index, newTask);
    //setTaskList(newList);
    //해당 task update하는 api 호출로 대체 예정
  };

  const deleteTask = (task: TaskObj) => {
    //const index = taskList.findIndex((listItem) => listItem === task);
    //const newList = removeItemAtIndex(taskList, index);
    //setTaskList(newList);
    //해당 task delete하는 api 호출로 대체 예정
    //전체 task select하는 api호출 후 setTaskList();
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

  // useEffect(()=>{
  //   const taskobjs:TaskObj[] = Array.from(Array(7)).map((_, index) =>
  //     {
  //       return {
  //       taskId: `TaskId${index+1}`,
  //       taskName: `Task${index+1}`,
  //       taskExplanation: `Task${index+1}에 대한 설명을 간단하게 적어주세요.`}
  //     });
  //   setTaskList([...taskobjs]);
  // }, []);

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
                  <Task
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
        selectedTask={selectedTask as TaskObj}
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
