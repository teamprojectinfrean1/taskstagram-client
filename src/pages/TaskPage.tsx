import Task from "@/components/TaskManagement/Task";
import Stack from '@mui/material/Stack';

const TaskPage = () => {
    return (
      <div >
        <Stack direction="row" spacing={3}>
          <Task taskName={"Task1"} taskExplanation={"Task1설명"} onSettingBtnClick={() => console.log('task1')}/>
          <Task taskName={"Task2"} taskExplanation={"Task2설명"} onSettingBtnClick={() => console.log('task2')}/>
        </Stack>

      </div>
    );
  };
  
  export default TaskPage;