import Task from "@/components/TaskManagement/Task";
import NewTaskCard from "@/components/TaskManagement/NewTaskCard";
import TaskModal from "@/components/TaskManagement/TaskModal";
import { useState, useEffect } from "react";
import { Grid, Typography } from '@mui/material';
import TaskObj from "@/models/TaskObj";

const TaskPage = () => {
  const [tasks, setTasks] = useState<TaskObj[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState("");

  useEffect(()=>{
    const taskobjs:TaskObj[] = Array.from(Array(7)).map((_, index) => 
      {
        return {
        taskId: `TaskId${index+1}`,
        taskName: `Task${index+1}`,
        taskExplanation: `Task${index+1}설명`,
        isSelected: false}
      });
    setTasks([...taskobjs]);
  }, []);

    return (
      <div>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {tasks.map(task =>
            <Grid item xs={2} sm={4} md={3} key={task.taskId}>
              <Task key={task.taskId}
                taskName={task.taskName} 
                taskExplanation={task.taskExplanation} 
                onSettingBtnClick={() => console.log("task")}
                onShowTaskModal={setShowModal}
                onSelectTaskId={setSelectedTaskId}
              />
            </Grid>)}
            <Grid item xs={2} sm={3} md={3}>
              <NewTaskCard onShowTaskModal={setShowModal}></NewTaskCard>
            </Grid>
        </Grid>
        <TaskModal isOpen={showModal} onCloseModal={() => setShowModal(false)}></TaskModal>
      </div>
    );
  };
  
  export default TaskPage;