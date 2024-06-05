import { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  InputLabel,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextEditor from "@/components/Editor/TextEditor";
import { CommentContainer } from "@/components/Comment";
import SearchableSelect from "@/components/SearchableSelect";
import theme from "@/theme/theme";
import DurationPicker from "@/components/DurationPicker";
import { grey } from "@mui/material/colors";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/stores/userStore";
import UserAvatar from "@/components/UserAvatar";
import { RawDraftContentState } from "draft-js";
import {
  IssueCreateButton,
  IssueDeleteButton,
  IssueUpdateButton,
  SkeletonIssueFormModal,
} from "@/components/Issue";
import useGetIssueDetails from "@/hooks/useGetIssueDetails";
import useGetMemberAndTaskOptions from "@/hooks/useGetMemberAndTaskOptions";
import PrimaryButton from "@/components/PrimaryButton";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

type Status = {
  statusId: IssueStatus | null;
  statusTitle: IssueStatusTitle | null;
};

type IssueUpdate = {
  [P in keyof Issue]?: Issue[P];
};

type IssueFormModalProps = {
  currentIssueId: string;
  handleClose: () => void;
  projectId: string;
};

const IssueFormModal = ({
  currentIssueId,
  handleClose,
  projectId,
}: IssueFormModalProps) => {
  const { memberId } = useRecoilValue(userInfoState);
  const isNewIssue = currentIssueId === "new-issue";

  const defaultFormData: Issue = {
    writerId: memberId || "",
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

  const { issueDetails, isLoading: issueDetailsIsLoading } = useGetIssueDetails(
    {
      currentIssueId,
      isNewIssue,
      setFormData,
    }
  );

  const {
    allProjectMemberList,
    isLoadingAllProjectMembers,
    isErrorLoadingAllProjectMembers,
    fetchAllProjectMemberList,
    allTaskList,
    isLoadingAllTaskList,
    isErrorLoadingAllTaskList,
    fetchAllTaskList,
  } = useGetMemberAndTaskOptions({ projectId: projectId! });

  const handleInputChange = (updates: IssueUpdate) => {
    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const isIssueContentEmpty = (rawContentState: RawDraftContentState) => {
    return (
      rawContentState.blocks.length === 1 &&
      rawContentState.blocks[0].text === "" &&
      rawContentState.blocks[0].inlineStyleRanges.length === 0 &&
      rawContentState.blocks[0].entityRanges.length === 0 &&
      Object.keys(rawContentState.entityMap).length === 0
    );
  };

  const isFormValid = () => {
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

  const handleFormSubmit = (mutateFunction: (issue: Issue) => void) => {
    if (!isFormValid()) return;

    const submissionData: Issue = {
      ...formData,
      issueTitle: formData.issueTitle!.trim(),
      issueContent:
        formData.issueContent && isIssueContentEmpty(formData.issueContent)
          ? null
          : formData.issueContent,
    };

    mutateFunction(submissionData);
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
            "& .MuiButtonBase-root": {
              px: 2,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.background.default,
              "&:hover": { backgroundColor: theme.palette.primary.light },
            },
            "& .MuiButtonBase-root.Mui-disabled": {
              backgroundColor: grey[400],
              color: grey[600],
              "&:hover": {
                backgroundColor: grey[400],
              },
            },
          }}
        >
          {currentIssueId === "new-issue" ? (
            <IssueCreateButton
              handleCloseIssueFormModal={handleClose}
              handleFormSubmit={handleFormSubmit}
              projectId={projectId}
            />
          ) : (
            <>
              <IssueUpdateButton
                handleCloseIssueFormModal={handleClose}
                handleFormSubmit={handleFormSubmit}
                issueId={issueDetails?.issueId!}
                oldAssigneeId={issueDetails?.assigneeId!}
                oldIssueStatus={issueDetails?.statusId!}
                projectId={projectId}
              />
              <IssueDeleteButton
                handleCloseIssueFormModal={handleClose}
                issueId={issueDetails?.issueId!}
                projectId={projectId}
                issueStatus={issueDetails?.statusId}
              />
            </>
          )}
          <PrimaryButton onClick={handleClose} startIcon={<CloseIcon />}>
            닫기
          </PrimaryButton>
        </DialogActions>
        {issueDetails?.lastUpdateDetail && (
          <Typography
            align="right"
            sx={{ color: grey[600], fontSize: ".8rem" }}
          >
            최종 수정일:{" "}
            {issueDetails?.lastUpdateDetail?.updatedDate.split("T")[0]}
            <br />
            최종 수정자: {issueDetails?.lastUpdateDetail?.userNickname}
          </Typography>
        )}
        <Grid container spacing={4}>
          {issueDetailsIsLoading ? (
            <SkeletonIssueFormModal />
          ) : (
            <>
              <Grid item xs={12} md={8} sx={{ "& > *": { mb: 3 } }}>
                <Box>
                  <InputLabel
                    htmlFor="title"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    제목 *
                  </InputLabel>
                  <TextField
                    id="title"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.issueTitle ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange({ issueTitle: e.target.value })
                    }
                    error={!!formErrors.issueTitle}
                    helperText={formErrors.issueTitle}
                  />
                </Box>
                <Box>
                  <InputLabel
                    htmlFor="content"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    내용
                  </InputLabel>
                  <TextEditor
                    id="content"
                    isReadOnly={false}
                    initialContent={formData.issueContent ?? ""}
                    handleContentChange={(content) =>
                      handleInputChange({ issueContent: content })
                    }
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4} sx={{ "& > *": { mb: 3 } }}>
                <Box>
                  <InputLabel
                    htmlFor="assignee"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    담당자
                  </InputLabel>
                  <SearchableSelect<Partial<ProjectMember>>
                    possibleOptions={allProjectMemberList || []}
                    selectedOptions={{
                      memberId: formData.assigneeId ?? null,
                      userNickname: formData.assigneeNickname ?? null,
                      userProfileImage: formData.assigneeProfileImage ?? null,
                    }}
                    onSelectionChange={(selected) => {
                      handleInputChange({
                        assigneeId: selected?.memberId ?? null,
                        assigneeNickname: selected?.userNickname ?? null,
                        assigneeProfileImage:
                          selected?.userProfileImage ?? null,
                      });
                    }}
                    optionIdentifier="memberId"
                    optionLabel="userNickname"
                    multiselect={false}
                    renderOption={(
                      props,
                      { memberId, userNickname, userProfileImage }
                    ) => (
                      <li {...props} key={memberId}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <UserAvatar
                            imageUrl={userProfileImage}
                            sx={{
                              width: 40,
                              height: 40,
                            }}
                          />
                          {userNickname}
                        </Box>
                      </li>
                    )}
                    renderSkeleton={(index) => (
                      <Box
                        key={index}
                        display="flex"
                        alignItems="center"
                        gap={2}
                      >
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton
                          variant="text"
                          animation="wave"
                          height={40}
                          sx={{ flexGrow: 1 }}
                        />
                      </Box>
                    )}
                    optionsFetchErrorMessage={
                      isErrorLoadingAllProjectMembers ? (
                        <Box position="relative" sx={{ py: 2, px: 3 }}>
                          <ErrorOutlineIcon
                            sx={{
                              position: "absolute",
                              left: 0,
                              fontSize: 25,
                            }}
                          />
                          <Typography
                            sx={{
                              textAlign: "center",
                              fontSize: ".7rem",
                              fontWeight: 600,
                            }}
                          >
                            프로젝트 내 구성원 목록을 불러오는 중 문제가
                            발생했습니다.
                            <br />
                            <br />
                            나중에 다시 시도해 주십시오.
                          </Typography>
                        </Box>
                      ) : undefined
                    }
                    optionIsLoading={isLoadingAllProjectMembers}
                    fetchOptions={fetchAllProjectMemberList}
                  />
                </Box>
                <Box>
                  <InputLabel htmlFor="task" sx={{ fontWeight: "bold", mb: 1 }}>
                    태스크 *
                  </InputLabel>
                  <SearchableSelect<Partial<Task>>
                    possibleOptions={allTaskList || []}
                    selectedOptions={{
                      taskId: formData.taskId,
                      taskTitle: formData.taskTitle,
                    }}
                    onSelectionChange={(selected) =>
                      handleInputChange({
                        taskId: selected?.taskId ?? "",
                        taskTitle: selected?.taskTitle ?? "",
                      })
                    }
                    optionIdentifier="taskId"
                    optionLabel="taskTitle"
                    multiselect={false}
                    error={!!formErrors.taskId}
                    helperText={formErrors.taskId}
                    renderSkeleton={(index) => (
                      <Skeleton
                        key={index}
                        variant="text"
                        animation="wave"
                        height={40}
                      />
                    )}
                    optionsFetchErrorMessage={
                      isErrorLoadingAllTaskList ? (
                        <Box
                          position="relative"
                          sx={{ py: 2, px: 3, borderRadius: "2px dotted red" }}
                        >
                          <ErrorOutlineIcon
                            sx={{
                              position: "absolute",
                              left: 0,
                              fontSize: 25,
                            }}
                          />
                          <Typography
                            sx={{
                              textAlign: "center",
                              fontSize: ".7rem",
                              fontWeight: 600,
                            }}
                          >
                            프로젝트 내 태스크 목록을 불러오는 중 문제가
                            발생했습니다.
                            <br />
                            <br />
                            나중에 다시 시도해 주십시오.
                          </Typography>
                        </Box>
                      ) : undefined
                    }
                    optionIsLoading={isLoadingAllTaskList}
                    fetchOptions={fetchAllTaskList}
                  />
                </Box>
                <Stack>
                  <InputLabel
                    htmlFor="dateRange"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    기간
                  </InputLabel>
                  <DurationPicker
                    isReadOnly={false}
                    selectedStartDate={formData.startDate}
                    selectedEndDate={formData.endDate}
                    onStartDateSelectionChange={(value) =>
                      handleInputChange({ startDate: value })
                    }
                    onEndDateSelectionChange={(value) =>
                      handleInputChange({ endDate: value })
                    }
                  />
                </Stack>
                <Box>
                  <InputLabel
                    htmlFor="issueStatus"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    상태 *
                  </InputLabel>
                  <SearchableSelect<Status>
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
                </Box>
              </Grid>{" "}
            </>
          )}
          <Grid item xs={12} md={8}>
            {!isNewIssue && (
              <CommentContainer issueDetailsIsLoading={issueDetailsIsLoading} />
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default IssueFormModal;
