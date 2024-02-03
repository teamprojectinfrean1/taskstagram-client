import Task from "@/components/TaskManagement/Task";
import TaskModal from "@/components/TaskManagement/TaskModal";
import { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import TaskObj from "@/models/TaskObj";

const TaskPage = () => {
  const [tasks, setTasks] = useState<TaskObj[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState("");

  useEffect(()=>{
    const taskobjs:TaskObj[] = [
      {
        taskId: "TaskId1",
        taskName: "Task1",
        taskExplanation: "Task1설명",
        isSelected: false
      },
      {
        taskId: "TaskId2",
        taskName: "Task2",
        taskExplanation: "Task2설명",
        isSelected: false
      }
    ]
    setTasks([...taskobjs]);
  }, []);

    return (
      <div>
        <Stack direction="row" spacing={3}>
          {tasks.map(task => 
            <Task key={task.taskId}
              taskName={task.taskName} 
              taskExplanation={task.taskExplanation} 
              onSettingBtnClick={() => console.log("task")}
              onShowTaskModal={setShowModal}
              onSelectTaskId={setSelectedTaskId}
            />)}
        </Stack>
        <TaskModal isOpen={showModal} onCloseModal={() => setShowModal(false)}></TaskModal>
      </div>
    );
  };
  
  export default TaskPage;