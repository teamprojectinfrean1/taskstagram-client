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
import { RawDraftContentState } from "draft-js";
import theme from "@/theme/theme";
import DurationPicker from "@/components/DurationPicker";
import { grey } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useQuery } from "react-query";
import { getIssueDetails } from "@/apis/issueApi";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/stores/userStore";
import UserAvatar from "@/components/UserAvatar";

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
  statusId: IssueStatus;
  statusTitle: IssueStatusTitle;
};

type IssueFormModalProps = {
  currentIssueId: string;
  handleClose: () => void;
};

const IssueFormModal = ({
  currentIssueId,
  handleClose,
}: IssueFormModalProps) => {
  const userInfo = useRecoilValue(userInfoState);
  const isNewIssue = currentIssueId === "new-issue";

  const defaultFormData: Issue = {
    taskId: null,
    taskTitle: null,
    assigneeId: null,
    assigneeName: null,
    assigneeProfileImage: null,
    issueTitle: "",
    issueContent: "",
    statusId: null,
    statusTitle: null,
    startDate: null,
    endDate: null,
  };

  const [formData, setFormData] = useState<Issue>(defaultFormData);

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
      setFormData({
        taskId: issueDetails.taskId,
        taskTitle: issueDetails.taskTitle,
        assigneeId: issueDetails.assigneeId,
        assigneeName: issueDetails.assigneeNickname,
        assigneeProfileImage: issueDetails.assigneeProfileImage,
        issueTitle: issueDetails.issueTitle,
        issueContent: issueDetails.issueContent,
        statusId: issueDetails.statusId,
        statusTitle: issueDetails.statusTitle,
        startDate: issueDetails.startDate,
        endDate: issueDetails.endDate,
      });
    }
  }, [isSuccess, issueDetails]);

  // const createIssueMutation = useMutation((newIssue) => createIssue(newIssue));
  // const updateIssueMutation = useMutation((issueDetails) =>
  //   updateIssue(issueDetails)
  // );

  console.log("****************FORM DATA", formData)
  type IssueUpdate = {
    [P in keyof Issue]?: Issue[P]; 
  };

  const handleInputChange = (updates: IssueUpdate) => {
    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // api 명세서 참고하고 추후 수정 필요:
    // const formData = new FormData(event.currentTarget);

    // const rawContentState = formData.get('content');
    // const contentString = rawContentState ? JSON.stringify(rawContentState) : null;

    // const formJson = Object.fromEntries(formData.entries());
    // formJson.content = contentString;

    // console.log(formJson);
    // handleClose();
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
        <DialogActions sx={{ mb: 3, p: 0 }}>
          {currentIssueId === "new-issue" ? (
            <Button onClick={handleClose} startIcon={<AddIcon />}>
              등록
            </Button>
          ) : (
            <>
              <Button onClick={handleClose} startIcon={<SaveAsIcon />}>
                수정
              </Button>
              <Button onClick={handleClose} startIcon={<DeleteIcon />}>
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
            <Box>
              <InputLabel htmlFor="title" sx={{ fontWeight: "bold", mb: 1 }}>
                제목
              </InputLabel>
              <TextField
                id="title"
                variant="outlined"
                fullWidth
                value={formData.issueTitle ?? ""}
                onChange={(e) =>
                  handleInputChange({ issueTitle: e.target.value })
                }
              />
            </Box>
            <Box>
              <InputLabel htmlFor="content" sx={{ fontWeight: "bold", mb: 1 }}>
                내용
              </InputLabel>
              {/* <TextEditor
                id="content"
                initialContent={formData.issueContent}
                handleContentChange={(content) =>
                  handleInputChange("issueContent", content)
                }
              /> */}
            </Box>
            <CommentContainer />
          </Grid>
          <Grid item xs={12} md={4} sx={{ "& > *": { mb: 3 } }}>
            <Typography align="right" variant="body2" sx={{ color: grey[600] }}>
              날짜
            </Typography>
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
                userNickname: formData.assigneeName,
                userProfileImage: formData.assigneeProfileImage,
              }}
              onSelectionChange={(selected) =>
                handleInputChange({
                  assigneeId: selected?.userId ?? null,
                  assigneeName: selected?.userNickname ?? null,
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
              label="태스크"
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
              label="상태"
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
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default IssueFormModal;
