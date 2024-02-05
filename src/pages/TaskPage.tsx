import Task from "@/components/TaskManagement/Task";
import NewTaskCard from "@/components/TaskManagement/NewTaskCard";
import TaskModal from "@/components/TaskManagement/TaskModal";
import { useState, useEffect } from "react";
import { Grid, Box, Typography } from '@mui/material';
import TaskObj from "@/models/TaskObj";
import { useRecoilValue } from "recoil";
import { taskListState } from "@/stores/Store";


const TaskPage = () => {
  const [tasks, setTasks] = useState<TaskObj[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskObj>();

  const taskList = useRecoilValue(taskListState);

  useEffect(()=>{
    const taskobjs:TaskObj[] = Array.from(Array(7)).map((_, index) => 
      {
        return {
        taskId: `TaskId${index+1}`,
        taskName: `Task${index+1}`,
        taskExplanation: `Task${index+1}에 대한 설명을 간단하게 적어주세요.`,
        isSelected: false}
      });
    setTasks([...taskobjs]);
  }, []);

    return (
      <div>
        <Box sx={{ flexGrow: 1}}>
          <Grid container spacing={1} padding={5}>
            <Typography>TASK</Typography>
            <Grid container justifyContent="center" rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {taskList.length > 0 ? taskList.map(task =>
                <Grid item xs={3} key={task.taskId}>
                  <Task key={task.taskId}
                    item={task}
                    taskName={task.taskName} 
                    taskExplanation={task.taskExplanation.length > 55 ? task.taskExplanation.substring(0,55).concat("...") : task.taskExplanation}
                    onSettingBtnClick={() => console.log("task")}
                    onShowTaskModal={setShowModal}
                    onSelectTask={setSelectedTask}
                  />
                </Grid>) : null}
                <Grid item xs={3}>
                  <NewTaskCard onShowTaskModal={setShowModal}></NewTaskCard>
                </Grid>
            </Grid>
          </Grid>
        </Box>
        <TaskModal task={selectedTask as TaskObj} isOpen={showModal} onCloseModal={() => setShowModal(false)}></TaskModal>
        
      </div>
    );
  };
  
  export default TaskPage;