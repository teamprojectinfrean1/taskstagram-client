import { Modal, Grid, Box, Button, TextField, InputLabel, RadioGroup, Radio, FormControl, FormControlLabel } from '@mui/material';
import TaskDurationDatePicker from "@/components/TaskManagement/TaskDurationDatePicker";
import { useEffect, useState } from 'react';
import TaskObj from '@/models/TaskObj';
import SearchableSelect from "@/components/SearchableSelect";
import { Dayjs } from 'dayjs';
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from '@mui/icons-material/Delete';
import TextEditor from '@/components/TextEditor';
import { RawDraftContentState } from 'draft-js';
import theme from '@/theme/theme';
import TaskTagChipMaker from '@/components/TagChipMaker';
import uuid from 'react-uuid';

type TaskModalProps={
    selectedTask: TaskObj,
    isOpen: boolean,
    onAdd(task:TaskObj): void;
    onReplace(currentTask:TaskObj, newTask:TaskObj): void;
    onDelete(task:TaskObj): void;
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
    maxWidth: 1300,//추후 반응형으로 변경 예정
    width: "100%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    height: "auto",
    maxHeight: "90%",
    overflowY: "scroll",
  };

const TaskModal = ({selectedTask, isOpen, onAdd, onReplace, onDelete, onCloseModal}:TaskModalProps) =>{
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
        if (isOpen === true && selectedTask) {
            setFormData({
                taskId: selectedTask.taskId,
                taskName: selectedTask.taskName,
                taskExplanation: selectedTask.taskExplanation,
                taskAssignee: selectedTask.taskAssignee,
                taskTags: selectedTask.taskTags,
                taskStartDate: selectedTask.taskStartDate,
                taskEndDate: selectedTask.taskEndDate,
                taskSubIssues: selectedTask.taskSubIssues,
                taskAuthorityType: selectedTask.taskAuthorityType
            });
        }
    },[selectedTask, isOpen]);

    //각 입력란 change 이벤트
    const handleInputChange = (field: keyof TaskObj, value: string | string[] | Dayjs | RawDraftContentState | null) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }

    const handleModalClose = () => {
        //초기화
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
        //모달창 닫기
        onCloseModal();
    }

    //저장버튼 이벤트
    const onClickSaveBtn = () => {

        if(!selectedTask){//새로운 task 생성시
            onAdd({
                taskId: uuid(),//taskId 주입
                taskName: formData.taskName,
                taskExplanation: formData.taskExplanation,
                taskAssignee: formData.taskAssignee,
                taskTags: formData.taskTags,
                taskStartDate: formData.taskStartDate,
                taskEndDate: formData.taskEndDate,
                taskSubIssues: formData.taskSubIssues,
                taskAuthorityType: formData.taskAuthorityType
            });
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
        handleModalClose();
    }

    //삭제버튼 이벤트
    const onClickDeleteBtn = () => {
        onDelete(selectedTask);
        handleModalClose();
    }

    return (
        <Modal open={isOpen} onClose={handleModalClose} disableScrollLock>
            <Box sx={style}>
                <Box sx={{ mb:1, p:0, display:"flex", justifyContent:"right" }}>
                    {/* <저장버튼 활성화 조건> 
                        1. 필수값 체크(일단 Task명으로만)
                        2. 이전값 이후값 비교*/}
                    <Button
                        type="submit"
                        onClick={onClickSaveBtn}
                        disabled={formData.taskName === ""}
                        startIcon={<SaveAsIcon />}>
                        저장
                    </Button>
                    <Button
                        type="submit"
                        onClick={onClickDeleteBtn}
                        disabled={selectedTask === null}
                        startIcon={<DeleteIcon />}>
                        삭제
                    </Button>
                    <Button onClick={handleModalClose} startIcon={<CloseIcon />}>
                        취소
                    </Button>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8} sx={{ "& > *": { mb: 3 } }}>
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
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ "& > *": { mb: 3 } }}>
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
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default TaskModal;