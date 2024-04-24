import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  InputLabel,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CloseIcon from "@mui/icons-material/Close";
import TextEditor from "@/components/Editor/TextEditor";
import CommentContainer from "@/components/Comment/CommentContainer";
import SearchableSelect from "@/components/SearchableSelect";
import theme from "@/theme/theme";
import DurationPicker from "@/components/DurationPicker";
import { grey } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useQuery } from "react-query";
import {
  createIssue,
  deleteIssue,
  getIssueDetails,
  updateIssueDetails,
} from "@/apis/issueApi";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/stores/userStore";
import UserAvatar from "@/components/UserAvatar";
import { useMutation } from "react-query";
import { RawAxiosRequestConfig } from "axios";
import { RawDraftContentState } from "draft-js";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@/stores/snackbarStore";

type User = {
  userId: string | null;
  userNickname: string | null;
  userProfileImage: string | null;
};

type Task = {
  taskId: string | null;
  taskTitle: string | null;
};

type Status = {
  statusId: IssueStatus | null;
  statusTitle: IssueStatusTitle | null;
};

type IssueFormModalProps = {
  currentIssueId: string;
  handleClose: () => void;
};

const IssueFormModal = ({
  currentIssueId,
  handleClose,
}: IssueFormModalProps) => {
  const setSnackbar = useSetRecoilState(snackbarState);
  const userInfo = useRecoilValue(userInfoState);
  const isNewIssue = currentIssueId === "new-issue";

  const defaultFormData: Issue = {
    writerId: userInfo.userId,
    taskId: null,
    taskTitle: null,
    assigneeId: null,
    assigneeNickname: null,
    assigneeProfileImage: null,
    issueTitle: null,
    issueContent: null,
    statusId: null,
    statusTitle: null,
    startDate: null,
    endDate: null,
  };

  const [formData, setFormData] = useState<Issue>(defaultFormData);
  const [formErrors, setFormErrors] = useState<Partial<Issue>>({});

  const {
    data: issueDetails,
    isError,
    isLoading,
    isSuccess,
  } = useQuery(
    ["issueDetails", currentIssueId],
    () => getIssueDetails({ issueId: currentIssueId }),
    {
      enabled: !isNewIssue,
    }
  );

  useEffect(() => {
    if (isSuccess && issueDetails) {
      setFormData((prev) => ({
        ...prev,
        taskId: issueDetails.taskId,
        taskTitle: issueDetails.taskTitle,
        assigneeId: issueDetails.assigneeId,
        assigneeNickname: issueDetails.assigneeNickname,
        assigneeProfileImage: issueDetails.assigneeProfileImage,
        issueTitle: issueDetails.issueTitle,
        issueContent: issueDetails.issueContent,
        statusId: issueDetails.statusId,
        statusTitle: issueDetails.statusTitle,
        startDate: issueDetails.startDate,
        endDate: issueDetails.endDate,
      }));
    }
  }, [isSuccess, issueDetails]);

  useEffect(() => {
    if (isError) {
      setSnackbar({
        show: true,
        message:
          "이슈를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주십시오.",
        severity: "error",
      });
    }
  }, [isError, setSnackbar]);

  console.log("****************FORM DATA", formData);

  type IssueUpdate = {
    [P in keyof Issue]?: Issue[P];
  };

  const handleInputChange = (updates: IssueUpdate) => {
    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const {
    mutate: executeCreateIssue,
    data: createIssueData,
    isLoading: createIssueIsLoading,
    isSuccess: createIssueIsSuccess,
    isError: createIssueIsError,
  } = useMutation((issue: Issue) => createIssue({ issue }));

  useEffect(() => {
    if (createIssueIsSuccess) {
      setSnackbar({
        show: true,
        message: "이슈를 추가했습니다.",
        severity: "success",
      });
    }
  }, [createIssueIsSuccess, setSnackbar]);

  useEffect(() => {
    if (createIssueIsError) {
      setSnackbar({
        show: true,
        message:
          "이슈를 추가하는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주십시오.",
        severity: "error",
      });
    }
  }, [createIssueIsError, setSnackbar]);

  const {
    mutate: executeUpdateIssueDetails,
    data: updateIssueData,
    isLoading: updateIssueIsLoading,
    isSuccess: updateIssueIsSuccess,
    isError: updateIssueIsError,
  } = useMutation((issue: Issue) =>
    updateIssueDetails({ issueId: issueDetails!.issueId!, issue })
  );

  useEffect(() => {
    if (updateIssueIsSuccess) {
      setSnackbar({
        show: true,
        message: "이슈를 수정했습니다.",
        severity: "success",
      });
    }
  }, [updateIssueIsSuccess, setSnackbar]);

  useEffect(() => {
    if (updateIssueIsError) {
      setSnackbar({
        show: true,
        message:
          "이슈를 수정하는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주십시오.",
        severity: "error",
      });
    }
  }, [updateIssueIsError, setSnackbar]);

  const {
    mutate: executeDeleteIssue,
    data: deleteIssueData,
    isLoading: deleteissueisLoading,
    isSuccess: deleteIssueIsSuccess,
    isError: deleteIssueIsError,
  } = useMutation(() => deleteIssue({ issueId: issueDetails!.issueId! }));

  useEffect(() => {
    if (deleteIssueIsSuccess) {
      setSnackbar({
        show: true,
        message: "이슈를 삭제했습니다.",
        severity: "success",
      });
    }
  }, [deleteIssueIsSuccess, setSnackbar]);

  useEffect(() => {
    if (deleteIssueIsError) {
      setSnackbar({
        show: true,
        message:
          "이슈를 삭제하는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주십시오.",
        severity: "error",
      });
    }
  }, [deleteIssueIsError]);

  useEffect(() => {
    if (createIssueIsLoading || updateIssueIsLoading || deleteissueisLoading) {
      // show spinner
    }
  }, [createIssueIsLoading, updateIssueIsLoading, deleteissueisLoading]);

  const isIssueContentEmpty = (rawContentState: RawDraftContentState) => {
    return (
      rawContentState.blocks.length === 1 &&
      rawContentState.blocks[0].text === "" &&
      rawContentState.blocks[0].inlineStyleRanges.length === 0 &&
      rawContentState.blocks[0].entityRanges.length === 0 &&
      Object.keys(rawContentState.entityMap).length === 0
    );
  };

  const validateForm = () => {
    const errors: Partial<Issue> = {};

    const idFields = ["writerId", "statusId", "taskId"];

    idFields.forEach((field) => {
      if (!formData[field as keyof Issue]) {
        errors[field as keyof Issue] = "필수 입력 항목입니다.";
      }
    });

    if (!formData.issueTitle?.trim()) {
      errors.issueTitle = "필수 입력 항목입니다.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const submissionData: Issue = {
      ...formData,
      issueTitle: formData.issueTitle!.trim(),
      issueContent:
        formData.issueContent && isIssueContentEmpty(formData.issueContent)
          ? null
          : formData.issueContent,
    };

    if (isNewIssue) {
      executeCreateIssue(submissionData);
    } else {
      executeUpdateIssueDetails(submissionData);
    }
  };

  return (
    <Dialog
      open={!!currentIssueId}
      PaperProps={{
        sx: {
          maxWidth: 1400,
          width: "100%",
          backgroundColor: theme.palette.background.default,
        },
        component: "form",
      }}
    >
      <DialogContent className="custom-scrollbar">
        <DialogActions
          sx={{
            mb: 3,
            p: 0,
            "& > .MuiButtonBase-root": {
              px: 2,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.background.default,
              "&:hover": { backgroundColor: theme.palette.primary.light },
            },
          }}
        >
          {currentIssueId === "new-issue" ? (
            <Button onClick={handleFormSubmit} startIcon={<AddIcon />}>
              추가
            </Button>
          ) : (
            <>
              <Button
                disabled={!issueDetails}
                onClick={handleFormSubmit}
                startIcon={<SaveAsIcon />}
              >
                수정
              </Button>
              <Button
                disabled={!issueDetails}
                onClick={(event) => {
                  event.preventDefault();
                  if (issueDetails) {
                    executeDeleteIssue();
                  }
                }}
                startIcon={<DeleteIcon />}
              >
                삭제
              </Button>
            </>
          )}
          <Button onClick={handleClose} startIcon={<CloseIcon />}>
            닫기
          </Button>
        </DialogActions>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} sx={{ "& > *": { mb: 3 } }}>
            {/* isLoading 이 true 일시 skeleton render */}
            <Box>
              <InputLabel htmlFor="title" sx={{ fontWeight: "bold", mb: 1 }}>
                제목 *
              </InputLabel>
              <TextField
                id="title"
                variant="outlined"
                fullWidth
                required
                value={formData.issueTitle}
                onChange={(e) =>
                  handleInputChange({ issueTitle: e.target.value })
                }
                error={!!formErrors.issueTitle}
                helperText={formErrors.issueTitle}
              />
            </Box>
            <Box>
              <InputLabel htmlFor="content" sx={{ fontWeight: "bold", mb: 1 }}>
                내용
              </InputLabel>
              <TextEditor
                id="content"
                initialContent={formData.issueContent}
                handleContentChange={(content) =>
                  handleInputChange({ issueContent: content })
                }
              />
            </Box>
            <CommentContainer />
          </Grid>
          <Grid item xs={12} md={4} sx={{ "& > *": { mb: 3 } }}>
            <SearchableSelect<User>
              label="담당자"
              possibleOptions={[
                {
                  userId: "1",
                  userNickname: "User 1",
                  userProfileImage: null,
                },
                {
                  userId: "2",
                  userNickname: "User 2",
                  userProfileImage: null,
                },
                {
                  userId: "3",
                  userNickname: "User 3",
                  userProfileImage: null,
                },
              ]}
              selectedOptions={{
                userId: formData.assigneeId,
                userNickname: formData.assigneeNickname,
                userProfileImage: formData.assigneeProfileImage,
              }}
              onSelectionChange={(selected) =>
                handleInputChange({
                  assigneeId: selected?.userId ?? null,
                  assigneeNickname: selected?.userNickname ?? null,
                })
              }
              optionIdentifier="userId"
              optionLabel="userNickname"
              multiselect={false}
              InputProps={(params) => ({
                ...params.InputProps,
                startAdornment: formData.assigneeId && (
                  <UserAvatar
                    sx={{
                      imageUrl: formData.assigneeProfileImage,
                      width: 40,
                      height: 40,
                      ml: 1,
                      mr: 3,
                    }}
                  />
                ),
              })}
              renderOption={(props, { userNickname, userProfileImage }) => (
                <li {...props}>
                  <Box display="flex" alignItems="center" gap={4}>
                    <UserAvatar
                      sx={{ imageUrl: userProfileImage, width: 40, height: 40 }}
                    />
                    {userNickname}
                  </Box>
                </li>
              )}
            />
            <SearchableSelect<Task>
              label="태스크 *"
              possibleOptions={[
                { taskId: "1", taskTitle: "Task 1" },
                { taskId: "2", taskTitle: "Task 2" },
                { taskId: "3", taskTitle: "Task 3" },
              ]}
              selectedOptions={{
                taskId: formData.taskId,
                taskTitle: formData.taskTitle,
              }}
              onSelectionChange={(selected) =>
                handleInputChange({
                  taskId: selected?.taskId ?? null,
                  taskTitle: selected?.taskTitle ?? null,
                })
              }
              optionIdentifier="taskId"
              optionLabel="taskTitle"
              multiselect={false}
              error={!!formErrors.taskId}
              helperText={formErrors.taskId}
            />

            <InputLabel htmlFor="dateRange" sx={{ fontWeight: "bold", mb: 1 }}>
              기간
            </InputLabel>
            <DurationPicker
              selectedStartDate={formData.startDate}
              selectedEndDate={formData.endDate}
              onStartDateSelectionChange={(value) =>
                handleInputChange({ startDate: value })
              }
              onEndDateSelectionChange={(value) =>
                handleInputChange({ endDate: value })
              }
            />
            <SearchableSelect<Status>
              label="상태 *"
              possibleOptions={[
                { statusId: "TODO", statusTitle: "할 일" },
                { statusId: "INPROGRESS", statusTitle: "진행 중" },
                { statusId: "DONE", statusTitle: "완료" },
              ]}
              selectedOptions={{
                statusId: formData.statusId,
                statusTitle: formData.statusTitle,
              }}
              onSelectionChange={(selected) =>
                handleInputChange({
                  statusId: selected?.statusId ?? null,
                  statusTitle: selected?.statusTitle ?? null,
                })
              }
              optionIdentifier="statusId"
              optionLabel="statusTitle"
              multiselect={false}
              error={!!formErrors.statusId}
              helperText={formErrors.statusId}
            />
            {issueDetails?.lastUpdatedDetail && (
              <Typography
                align="right"
                sx={{ color: grey[600], fontSize: ".7rem" }}
              >
                최종 수정일: {issueDetails.lastUpdatedDetail.updatedDate} <br />
                최종 수정자: {issueDetails.lastUpdatedDetail.userNickname}
              </Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default IssueFormModal;
