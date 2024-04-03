import {
  Modal,
  Grid,
  Box,
  Button,
  TextField,
  InputLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import TaskObj from "@/models/TaskObj";
import { Dayjs } from "dayjs";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import TextEditor from "@/components/Editor/TextEditor";
import { RawDraftContentState, convertToRaw } from "draft-js";
import theme from "@/theme/theme";
import TaskTagChipMaker from "@/components/TagChipMaker";
import DurationPicker from "@/components/DurationPicker";
import uuid from "react-uuid";
import { useQuery } from "react-query";
import { getTaskDetail } from "@/apis/TaskApi";

type TaskModalProps = {
  selectedTask: TaskObj;
  isOpen: boolean;
  onAdd(task: TaskObj): void;
  onReplace(currentTask: TaskObj, newTask: TaskObj): void;
  onDelete(task: TaskObj): void;
  onCloseModal: () => void;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 1300, //추후 반응형으로 변경 예정
  width: "80%",
  bgcolor: theme.palette.background.default,
  boxShadow: 24,
  p: 2,
  height: "auto",
  maxHeight: "90%",
  overflowY: "scroll",
};

const TaskModal = ({
  selectedTask,
  isOpen,
  onAdd,
  onReplace,
  onDelete,
  onCloseModal,
}: TaskModalProps) => {
  const [formData, setFormData] = useState<TaskObj>({
    taskId: "",
    taskTitle: "",
    taskContent: null,
    taskTags: null,
    taskStartDate: null,
    taskEndDate: null,
    taskAuthorityType: "",
    taskStatus: null,
  });

  const { data } = useQuery(
    ["getTaskDetail", selectedTask],
    () => getTaskDetail(selectedTask.taskId),
    { enabled: !!selectedTask && !!selectedTask.taskId }
  );

  useEffect(() => {
    if (isOpen === true && data) {
      setFormData({
        taskId: data.taskId,
        taskTitle: data.taskTitle,
        taskContent: data.taskContent,
        taskTags: data.taskTags,
        taskStartDate: data.taskStartDate,
        taskEndDate: data.taskEndDate,
        taskAuthorityType: data.taskAuthorityType,
        taskStatus: data.taskStatus,
      });
    }
  }, [data, isOpen]);

  //각 입력란 change 이벤트
  const handleInputChange = (
    field: keyof TaskObj,
    value: string | string[] | Dayjs | RawDraftContentState | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleModalClose = () => {
    //초기화
    setFormData({
      taskId: "",
      taskTitle: "",
      taskContent: null,
      taskTags: null,
      taskStartDate: null,
      taskEndDate: null,
      taskAuthorityType: "",
      taskStatus: null,
    });
    //모달창 닫기
    onCloseModal();
  };

  //저장버튼 이벤트
  const onClickSaveBtn = () => {
    if (!selectedTask) {
      //새로운 task 생성시
      onAdd({
        taskId: uuid(), //taskId 주입
        taskTitle: formData.taskTitle,
        taskContent: formData.taskContent,
        taskTags: formData.taskTags,
        taskStartDate: formData.taskStartDate,
        taskEndDate: formData.taskEndDate,
        taskAuthorityType: formData.taskAuthorityType,
        taskStatus: formData.taskStatus,
      });
    } else {
      //이미 생성된 Task
      onReplace(selectedTask, {
        ...selectedTask,
        taskTitle: formData.taskTitle,
        taskContent: formData.taskContent,
        taskTags: formData.taskTags,
        taskStartDate: formData.taskStartDate,
        taskEndDate: formData.taskEndDate,
        taskAuthorityType: formData.taskAuthorityType,
        taskStatus: formData.taskStatus,
      });
    }
    handleModalClose();
  };

  //삭제버튼 이벤트
  const onClickDeleteBtn = () => {
    onDelete(selectedTask);
    handleModalClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleModalClose}
      disableScrollLock
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <Box sx={style}>
        <Box sx={{ mb: 1, p: 0, display: "flex", justifyContent: "right" }}>
          {/* <저장버튼 활성화 조건> 
                      1. 필수값 체크(일단 Task명으로만)
                      2. 이전값 이후값 비교*/}
          <Button
            type="submit"
            onClick={onClickSaveBtn}
            disabled={formData.taskTitle === ""}
            startIcon={<SaveAsIcon />}
          >
            저장
          </Button>
          <Button
            type="submit"
            onClick={onClickDeleteBtn}
            disabled={selectedTask === null}
            startIcon={<DeleteIcon />}
          >
            삭제
          </Button>
          <Button onClick={handleModalClose} startIcon={<CloseIcon />}>
            취소
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} sx={{ "& > *": { mb: 3 } }}>
            <Box sx={{ display: "grid", gap: 1 }}>
              <InputLabel htmlFor="Task명" sx={{ fontWeight: "bold", mb: 1 }}>
                Task명
              </InputLabel>
              <TextField
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                }}
                color="secondary"
                value={formData.taskTitle}
                onChange={(e) => handleInputChange("taskTitle", e.target.value)}
              />
              <InputLabel htmlFor="내용" sx={{ fontWeight: "bold", mb: 1 }}>
                내용
              </InputLabel>
              <TextEditor
                id="content"
                initialContent={null}
                handleContentChange={(value) =>
                  handleInputChange("taskContent", value)
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ "& > *": { mb: 3 } }}>
            <InputLabel htmlFor="태그" sx={{ fontWeight: "bold", mb: 1 }}>
              태그
            </InputLabel>
            <TaskTagChipMaker
              tagList={formData.taskTags}
              onTagSelectionChange={(value) =>
                handleInputChange("taskTags", value)
              }
            />
            <InputLabel htmlFor="기간" sx={{ fontWeight: "bold", mb: 1 }}>
              기간
            </InputLabel>
            <DurationPicker
              selectedStartDate={formData.taskStartDate}
              selectedEndDate={formData.taskEndDate}
              onStartDateSelectionChange={(value) =>
                handleInputChange("taskStartDate", value)
              }
              onEndDateSelectionChange={(value) =>
                handleInputChange("taskEndDate", value)
              }
            />
            <InputLabel
              htmlFor="수정/삭제 권한"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              수정/삭제 권한
            </InputLabel>
            <Box
              sx={{
                borderRadius: 1,
                border: 1,
                p: 2,
                borderColor: theme.palette.secondary.light,
              }}
            >
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={formData.taskAuthorityType}
                  onChange={(e) =>
                    handleInputChange("taskAuthorityType", e.target.value)
                  }
                >
                  <FormControlLabel
                    value="allUsers"
                    control={<Radio />}
                    label="모든 구성원"
                  />
                  <FormControlLabel
                    value="onlyLeader"
                    control={<Radio />}
                    label="리더만"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default TaskModal;
