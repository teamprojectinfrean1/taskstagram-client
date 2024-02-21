import { Modal, Grid, Box, Typography, TextField, InputLabel, RadioGroup, Radio, FormControl, FormControlLabel } from '@mui/material';
import TaskDurationDatePicker from "@/components/TaskManagement/TaskDurationDatePicker";
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { taskListState } from '@/stores/Store';
import TaskObj from '@/models/TaskObj';
import SearchableSelect from "@/components/SearchableSelect";
import { Dayjs } from 'dayjs';
import TextEditor from '../TextEditor';
import { RawDraftContentState } from 'draft-js';
import theme from '@/theme/theme';
import TaskTagChipMaker from './TaskTagChipMaker';

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
    width: 1300,//추후 반응형으로 변경 예정
    height: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

const TaskModal = ({selectedTask, isOpen, onAdd, onReplace, onCloseModal}:TaskModalProps) =>{
    const [taskList, setTaskList] = useRecoilState(taskListState);
    const [formData, setFormData] = useState<TaskObj>({
        taskId: "",
        taskName: "",
        taskExplanation: null,
        taskAssignee: null,
        taskTags: null,
        taskStartDate: null,
        taskEndDate: null,
        taskSubIssues: null,
        taskAuthorityType: ""
    });
 
    useEffect(()=>{
        setFormData({
            taskId: selectedTask ? selectedTask.taskId : '',
            taskName: selectedTask ? selectedTask.taskName : '',
            taskExplanation: selectedTask ? selectedTask.taskExplanation : null,
            taskAssignee: selectedTask ? selectedTask.taskAssignee : null,
            taskTags: selectedTask ? selectedTask.taskTags : null,
            taskStartDate: selectedTask ? selectedTask.taskStartDate : null,
            taskEndDate: selectedTask ? selectedTask.taskEndDate : null,
            taskSubIssues: selectedTask ? selectedTask.taskSubIssues : null,
            taskAuthorityType: selectedTask ? selectedTask.taskAuthorityType : ""
        })
    },[selectedTask]);

    const handleInputChange = (field: keyof TaskObj, value: string | string[] | Dayjs | RawDraftContentState | null) => {
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
                    taskAssignee: formData.taskAssignee,
                    taskTags: formData.taskTags,
                    taskStartDate: formData.taskStartDate,
                    taskEndDate: formData.taskEndDate,
                    taskSubIssues: formData.taskSubIssues,
                    taskAuthorityType: formData.taskAuthorityType
                });
            }
        }else{//이미 생성된 Task
            onReplace(selectedTask,{
                ...selectedTask,
                taskName: formData.taskName,
                taskExplanation: formData.taskExplanation,
                taskTags: formData.taskTags,
                taskAssignee: formData.taskAssignee,
                taskStartDate: formData.taskStartDate,
                taskEndDate: formData.taskEndDate,
                taskSubIssues: formData.taskSubIssues,
                taskAuthorityType: formData.taskAuthorityType
            });
        }
        setFormData({
            taskId: "",
            taskName: "",
            taskExplanation: null,
            taskAssignee: null,
            taskTags: null,
            taskStartDate: null,
            taskEndDate: null,
            taskSubIssues: null,
            taskAuthorityType: ""
        });

        onCloseModal();
    }

    return (
        <Modal open={isOpen} onClose={onModalClose}>
            <Box sx={style}>
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <Box sx={{display: 'grid',
                            gap: 1,}}>
                            <InputLabel htmlFor="Task명" sx={{ fontWeight: "bold", mb: 1 }}>
                                Task명
                            </InputLabel>
                            <TextField fullWidth sx={{"& .MuiInputBase-root": {
                                height: 40
                            }}} color="secondary" value={formData.taskName} onChange={(e) => handleInputChange("taskName", e.target.value)}/>
                            <InputLabel htmlFor="내용" sx={{ fontWeight: "bold", mb: 1 }}>
                                내용
                            </InputLabel>
                            <TextEditor
                                id="content"
                                initialContent={formData.taskExplanation}
                                handleContentChange={(value) => handleInputChange("taskExplanation", value)}
                            />
                            {/* <TextField fullWidth sx={{
                                "& .MuiInputBase-root": {height: 120}, 
                                gridColumn: '1', 
                                gridRow: 'span 4'}} color="secondary" 
                                value={formData.taskExplanation} 
                                onChange={(e) => handleInputChange("taskExplanation", e.target.value)}/> */}
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
                            <InputLabel htmlFor="태그" sx={{ fontWeight: "bold", mb: 1 }}>
                                태그
                            </InputLabel>
                            <TaskTagChipMaker
                                tagList={formData.taskTags}
                                onTagSelectionChange={(value) => handleInputChange("taskTags", value)}
                            />
                            <InputLabel htmlFor="기간" sx={{ fontWeight: "bold", mb: 1 }}>
                                기간
                            </InputLabel>
                            <TaskDurationDatePicker
                                startDate={formData.taskStartDate}
                                endDate={formData.taskEndDate}
                                onChangeStartDate={(value) => handleInputChange("taskStartDate", value)}
                                onChangeEndDate={(value) => handleInputChange("taskEndDate", value)}></TaskDurationDatePicker>
                            <SearchableSelect
                                label="하위 이슈"
                                possibleOptions={["Option 1", "Option 2", "Option 3"]}
                                selectedOptions={formData.taskSubIssues}
                                multiselect
                                onSelectionChange={(value) => handleInputChange("taskSubIssues", value)}
                            />
                            <InputLabel htmlFor="수정/삭제 권한" sx={{ fontWeight: "bold", mb: 1 }}>
                                수정/삭제 권한
                            </InputLabel>
                            <Box sx={{borderRadius: 1, border:1, p:2, borderColor: theme.palette.secondary.light}}>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={formData.taskAuthorityType}
                                        onChange={(e) => handleInputChange("taskAuthorityType", e.target.value)}>
                                        <FormControlLabel value="allUsers" control={<Radio />} label="모든 구성원" />
                                        <FormControlLabel value="onlyLeader" control={<Radio />} label="리더만" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default TaskModal;