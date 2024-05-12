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
  Typography,
  Skeleton,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import TextEditor from "@/components/Editor/TextEditor";
import { RawDraftContentState, convertToRaw } from "draft-js";
import theme from "@/theme/theme";
import TaskTagChipMaker from "@/components/TagChipMaker";
import DurationPicker from "@/components/DurationPicker";
import { useQuery } from "react-query";
import {
  getTaskDetail,
  CreateTaskRequest,
  ReplaceTaskRequest,
} from "@/apis/TaskApi";
import { selectedProjectState } from "@/stores/projectStore";
import { useRecoilValue } from "recoil";
import { grey } from "@mui/material/colors";
import PrimaryButton from "../PrimaryButton";

type TaskModalProps = {
  selectedTask: Task;
  isOpen: boolean;
  onAdd(request: CreateTaskRequest): void;
  onReplace(request: ReplaceTaskRequest): void;
  onDelete(task: Task): void;
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
  const [formData, setFormData] = useState<Task>({
    taskId: "",
    taskTitle: "",
    taskContent: null,
    taskTags: null,
    taskStartDate: null,
    taskEndDate: null,
    taskAuthorityType: "allProjectMember",
    taskStatus: null,
    lastUpdateUserNickname: "",
    lastUpdateDate: "",
  });

  const selectedProject = useRecoilValue(selectedProjectState);

  const { data, isLoading } = useQuery(
    ["getTaskDetail", selectedTask],
    () => getTaskDetail(selectedTask.taskId!),
    { enabled: !!selectedTask && !!selectedTask.taskId }
  );

  useEffect(() => {
    if (isOpen === true && data) {
      setFormData({
        taskId: data.taskId,
        taskTitle: data.taskTitle,
        taskContent: data.taskContent,
        taskTags:
          data.taskTags !== null && data.taskTags !== ""
            ? data.taskTags.split(",")
            : null,
        taskStartDate: data.startDate,
        taskEndDate: data.endDate,
        taskAuthorityType: data.editDeletePermission,
        taskStatus: data.taskStatus,
        lastUpdateUserNickname: data.lastUpdateDetail.userNickname,
        lastUpdateDate: data.lastUpdateDetail.updatedDate
          .replace("T", " ")
          .slice(0, -3),
      });
    }
  }, [data, isOpen]);

  //각 입력란 change 이벤트
  const handleInputChange = (
    field: keyof Task,
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
      taskAuthorityType: "allProjectMember",
      taskStatus: null,
      lastUpdateUserNickname: "",
      lastUpdateDate: "",
    });
    //모달창 닫기
    onCloseModal();
  };

  //저장버튼 이벤트
  const onClickSaveBtn = () => {
    if (selectedProject !== null && !selectedTask) {
      //새로운 task 생성시
      //필수값 체크 로직 추가해야함.
      onAdd({
        projectId: selectedProject.projectId,
        writerUuid: "085fe931-da02-456e-b8ff-67d6521a32b4", //임시 고정
        taskTitle: formData.taskTitle!,
        taskContent: formData.taskContent !== null ? formData.taskContent : "",
        taskTagList: formData.taskTags ?? [],
        startDate:
          formData.taskStartDate !== null
            ? new Date(formData.taskStartDate).toISOString()
            : null,
        endDate:
          formData.taskEndDate !== null
            ? new Date(formData.taskEndDate).toISOString()
            : null,
        editDeletePermission: formData.taskAuthorityType,
      });
    } else {
      //이미 생성된 Task
      onReplace({
        selectedTaskId: selectedTask !== null ? selectedTask.taskId : null,
        updaterUuid: "085fe931-da02-456e-b8ff-67d6521a32b4", //임시 고정
        taskTitle: formData.taskTitle!,
        taskContent: formData.taskContent !== null ? formData.taskContent : "",
        taskTagList: formData.taskTags ?? [],
        startDate:
          formData.taskStartDate !== null
            ? new Date(formData.taskStartDate).toISOString()
            : null,
        endDate:
          formData.taskEndDate !== null
            ? new Date(formData.taskEndDate).toISOString()
            : null,
        editDeletePermission: formData.taskAuthorityType,
      });
    }
    //handleModalClose();
  };

  //삭제버튼 이벤트
  const onClickDeleteBtn = () => {
    onDelete(selectedTask);
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
          <PrimaryButton
            sx={{ mr: "3px" }}
            onClick={onClickSaveBtn}
            disabled={isLoading || formData.taskTitle === ""}
            startIcon={<SaveAsIcon />}
          >
            저장
          </PrimaryButton>
          <PrimaryButton
            sx={{ mr: "3px" }}
            onClick={onClickDeleteBtn}
            disabled={isLoading || selectedTask === null}
            startIcon={<DeleteIcon />}
          >
            삭제
          </PrimaryButton>
          <PrimaryButton
            disabled={isLoading}
            onClick={handleModalClose}
            startIcon={<CloseIcon />}
          >
            닫기
          </PrimaryButton>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} sx={{ "& > *": { mb: 3 } }}>
            <Box sx={{ display: "grid", gap: 1 }}>
              <InputLabel htmlFor="제목" sx={{ fontWeight: "bold", mb: 1 }}>
                제목 *
              </InputLabel>
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  height={40}
                  sx={{ borderRadius: "4px" }}
                />
              ) : (
                <TextField
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 40,
                    },
                  }}
                  color="secondary"
                  value={formData.taskTitle}
                  onChange={(e) =>
                    handleInputChange("taskTitle", e.target.value)
                  }
                />
              )}

              <InputLabel htmlFor="내용" sx={{ fontWeight: "bold", mb: 1 }}>
                내용
              </InputLabel>
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  height={430}
                  sx={{ borderRadius: "4px" }}
                />
              ) : (
                <TextEditor
                  id="content"
                  initialContent={null}
                  handleContentChange={(value) =>
                    handleInputChange("taskContent", value)
                  }
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ "& > *": { mb: 3 } }}>
            <InputLabel htmlFor="태그" sx={{ fontWeight: "bold", mb: 1 }}>
              태그
            </InputLabel>
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                height={45}
                sx={{ borderRadius: "4px" }}
              />
            ) : (
              <TaskTagChipMaker
                isReadOnly={false}
                tagList={formData.taskTags}
                onTagSelectionChange={(value) =>
                  handleInputChange("taskTags", value)
                }
              />
            )}
            <InputLabel htmlFor="기간" sx={{ fontWeight: "bold", mb: 1 }}>
              기간
            </InputLabel>
            {isLoading ? (
              <Box display="flex" gap={2}>
                <Skeleton
                  variant="rectangular"
                  height={67}
                  sx={{ borderRadius: "4px", flexBasis: "50%" }}
                />
                <Skeleton
                  variant="rectangular"
                  height={67}
                  sx={{ borderRadius: "4px", flexBasis: "50%" }}
                />
              </Box>
            ) : (
              <DurationPicker
                isReadOnly={false}
                selectedStartDate={formData.taskStartDate}
                selectedEndDate={formData.taskEndDate}
                onStartDateSelectionChange={(value) =>
                  handleInputChange("taskStartDate", value)
                }
                onEndDateSelectionChange={(value) =>
                  handleInputChange("taskEndDate", value)
                }
              />
            )}
            <InputLabel
              htmlFor="수정/삭제 권한"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              수정/삭제 권한 *
            </InputLabel>
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                height={115}
                sx={{ borderRadius: "4px" }}
              />
            ) : (
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
                      value="allProjectMember"
                      control={<Radio />}
                      label="모든 구성원"
                    />
                    <FormControlLabel
                      value="projectLeader"
                      control={<Radio />}
                      label="리더만"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            )}
            <Stack alignItems="flex-end">
              {isLoading ? (
                <>
                  <Skeleton variant="text" width={150} />
                  <Skeleton variant="text" width={120} />
                </>
              ) : (
                <>
                  <Typography variant="body2" sx={{ color: grey[600] }}>
                    {formData.lastUpdateDate}
                  </Typography>
                  <Typography variant="body2" sx={{ color: grey[600] }}>
                    {formData.lastUpdateUserNickname}
                  </Typography>
                </>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default TaskModal;
