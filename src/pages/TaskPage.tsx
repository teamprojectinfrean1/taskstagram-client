import Task from "@/components/TaskManagement/Task";
import NewTask from "@/components/TaskManagement/NewTask";
import TaskModal from "@/components/TaskManagement/TaskModal";
import { useState, useEffect } from "react";
import { Grid, Box, Typography } from '@mui/material';
import TaskObj from "@/models/TaskObj";
import { useRecoilState, useRecoilValue } from "recoil";
import { taskListState } from "@/stores/Store";


const TaskPage = () => {
  const [taskList, setTaskList] = useRecoilState(taskListState);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskObj|null>();

  //util에 주입예정
  const replaceItemAtIndex = (arr:TaskObj[], index:number, newValue:TaskObj) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }

  //util에 주입예정
  const removeItemAtIndex = (arr:TaskObj[], index:number) => {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }

  const addTask = (task:TaskObj) => {
    setTaskList((oldTaskList) => [...oldTaskList, task]);
  };

  const replaceTask = (previousTask:TaskObj, newTask:TaskObj) => {
    const index = taskList.findIndex((listItem) => listItem === previousTask);
    const newList = replaceItemAtIndex(taskList, index, newTask);
    setTaskList(newList);
  }

  const deleteTask = (task:TaskObj) => {
    const index = taskList.findIndex((listItem) => listItem === task);
    const newList = removeItemAtIndex(taskList, index);

    setTaskList(newList);
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
        <Box>
          <Grid container spacing={1} p={5}>
            <Typography>TASK</Typography>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {taskList.length > 0 ? taskList.map(task =>
                <Grid item xs={3} key={task.taskId}>
                  <Task key={task.taskId}
                    selectedTask={task}
                    onDelete={deleteTask}
                    onShowTaskModal={setShowModal}
                    onSelectedTask={setSelectedTask}
                  />
                </Grid>) : null}
                <Grid item xs={3}>
                  <NewTask onClick={setSelectedTask} onShowTaskModal={setShowModal}></NewTask>
                </Grid>
            </Grid>
          </Grid>
        </Box>
        <TaskModal selectedTask={selectedTask as TaskObj} 
          isOpen={showModal} 
          onAdd={addTask}
          onReplace={replaceTask}
          onCloseModal={() => setShowModal(false)}></TaskModal>
        
      </div>
    );
  };
  
  export default TaskPage;