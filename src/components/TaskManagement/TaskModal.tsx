import { Modal, Grid, Box, Typography, TextField } from '@mui/material';
import TaskDurationDatePicker from "@/components/TaskManagement/TaskDurationDatePicker";
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { taskListState } from '@/stores/Store';
import TaskObj from '@/models/TaskObj';
import SearchableSelect from "@/components/SearchableSelect";

type TaskModalProps={
    selectedTask: TaskObj,
    isOpen: boolean,
    onAdd(task:TaskObj): void;
    onReplace(currentTask:TaskObj, newTask:TaskObj): void;
    onCloseModal: () => void;
}

type User={
    id: string,
    label: string,
    name: string
}

const users:User[] = [
    {id:"AD", label:"Andorra", name:"마효리"},
    {id:"AF", label:"Afghanistan", name:"정석호"},
    {id:"AI", label:"Anguilla", name:"박수빈"}
];

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

const TaskModal = ({selectedTask, isOpen, onAdd, onReplace, onCloseModal}:TaskModalProps) =>{
    const [taskList, setTaskList] = useRecoilState(taskListState);
    const [formData, setFormData] = useState<TaskObj>({
        taskId: "",
        taskName: "",
        taskExplanation: "",
        taskAssignee: null
    });
 
    useEffect(()=>{
        setFormData({
            taskId: selectedTask ? selectedTask.taskId : '',
            taskName: selectedTask ? selectedTask.taskName : '',
            taskExplanation: selectedTask ? selectedTask.taskExplanation : '',
            taskAssignee: selectedTask ? selectedTask.taskAssignee : null
        })
    },[selectedTask]);

    const handleInputChange = (field: keyof TaskObj, value: string | string[] | null) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }

    //모달창 닫힘 이벤트
    const onModalClose = () => {

        if(!selectedTask){//새로운 task 생성시
            if(formData.taskName){//일단 제목 입력시에만 생성되도록
                onAdd({
                    taskId: taskList.length + "s",//임시 Id
                    taskName: formData.taskName,
                    taskExplanation: formData.taskExplanation,
                    taskAssignee: formData.taskAssignee
                });
            }
            setFormData({
                taskId: "",
                taskName: "",
                taskExplanation: "",
                taskAssignee: null
            });
        }else{//이미 생성된 Task
            onReplace(selectedTask,{
                ...selectedTask,
                taskName: formData.taskName,
                taskExplanation: formData.taskExplanation,
                taskAssignee: formData.taskAssignee
            });
        }

        onCloseModal();
    }

    return (
        <Modal open={isOpen} onClose={onModalClose}>
            <Box sx={style}>
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <Box sx={{display: 'grid',
                            gap: 1,}}>
                            <Typography>Task명</Typography>
                            <TextField fullWidth sx={{"& .MuiInputBase-root": {
                                height: 40
                            }}} color="secondary" value={formData.taskName} onChange={(e) => handleInputChange("taskName", e.target.value)}/>
                            <Typography>내용</Typography>
                            <TextField fullWidth sx={{
                                "& .MuiInputBase-root": {height: 120}, 
                                gridColumn: '1', 
                                gridRow: 'span 4'}} color="secondary" value={formData.taskExplanation} onChange={(e) => handleInputChange("taskExplanation", e.target.value)}/>
                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                        <Box sx={{display: 'grid',
                            gap: 1,}}>
                            <SearchableSelect
                                label="담당자"
                                possibleOptions={["Option 1", "Option 2", "Option 3"]}
                                selectedOptions={formData.taskAssignee}
                                multiselect
                                onSelectionChange={(value) => handleInputChange("taskAssignee", value)}
                            />
                            <Typography>기간</Typography>
                            <TaskDurationDatePicker></TaskDurationDatePicker>
                            <Typography>하위 이슈</Typography>
                            <TextField color="secondary" focused />
                            <Typography>수정/삭제 권한</Typography>
                            <TextField color="secondary" focused />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default TaskModal;