import TagChipMaker from "@/components/TagChipMaker";
import { useState, useEffect } from "react";
import { ProjectFormData } from "@/models/Project";
import {
  Grid,
  TextField,
  Button,
  Box,
  InputLabel,
  Typography,
  Skeleton,
  Stack,
} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DurationPicker from "@/components/DurationPicker";
import SelectableProjectMember from "@/components/Project/SelectableProjectMember";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeleteIcon from "@mui/icons-material/Delete";
import { grey } from "@mui/material/colors";
import theme from "@/theme/theme";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createOneProject,
  replaceOneProject,
  deleteOneProject,
  getProjectDetail,
} from "@/apis/ProjectApi";
import { useRecoilValue } from "recoil";
import { selectedProjectState } from "@/stores/projectStore";
import { useLocation, useNavigate } from "react-router-dom";
import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import Spinner from "@/components/Spinner";
import { getAllMemberList, getAllProjectMemberList } from "@/apis/memberApi";
import OneFormModal from "@/components/OneFormModal";

const ProjectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [memberList, setMemberList] = useState<UserSummary[]>([]);
  const selectedProject = useRecoilValue(selectedProjectState);
  const type = location.state !== null ? location.state.type : "";
  const [showDeleteFormModal, setShowDeleteFormModal] = useState(false);
  const [showDeleteFormMoalInvalidText, showSetDeleteFormMoalInvalidText] =
    useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    projectId: "",
    projectName: "",
    projectContent: "",
    projectImageUrl: "",
    projectImageFile: null,
    projectStartDate: null,
    projectEndDate: null,
    projectMemberUuidList: [],
    projectTags: null,
    lastUpdateUserNickname: "",
    lastUpdateDate: "",
    isMainProject: false,
  });

  const { data, refetch, isLoading } = useQuery(
    ["getProjectDetail", selectedProject],
    () =>
      getProjectDetail(
        selectedProject !== null ? selectedProject.projectId : null
      ),
    { enabled: !!selectedProject && !!selectedProject.projectId }
  );

  const { data: allMemberList, isSuccess: isGetAllMemberListSuccess } =
    useQuery(["getAllMemberList"], () => getAllMemberList());

  const {
    data: allProjectMemberList,
    isSuccess: isGetAllProjectMemberListSuccess,
  } = useQuery(
    ["getAllProjectMemberList", selectedProject],
    () => {
      if (selectedProject && selectedProject.projectId) {
        return getAllProjectMemberList({
          projectId: selectedProject.projectId,
        });
      }
    },
    { enabled: !!selectedProject && !!selectedProject.projectId }
  );

  useEffect(() => {
    if (data) {
      setFormData({
        projectId: data.projectId,
        projectName: data.projectName,
        projectContent: data.projectContent,
        projectImageUrl: data.projectImage,
        projectImageFile: null,
        projectStartDate: data.startDate,
        projectEndDate: data.endDate,
        projectMemberUuidList: [],
        projectTags:
          data.projectTags !== null && data.projectTags !== ""
            ? data.projectTags.split(",")
            : null,
        lastUpdateUserNickname: data.lastUpdateDetail.userNickname,
        lastUpdateDate: data.lastUpdateDetail.updatedDate
          .replace("T", " ")
          .slice(0, -3),
        isMainProject: selectedProject?.isMainProject,
      });
      //선택된 프로젝트 변경될 때마다 location.state 초기화
      navigate(location.pathname, { replace: true });
    }
    if (type === "new") {
      setFormData({
        projectId: "",
        projectName: "",
        projectContent: "",
        projectImageUrl: "",
        projectImageFile: null,
        projectStartDate: null,
        projectEndDate: null,
        projectMemberUuidList: [],
        projectTags: null,
        lastUpdateUserNickname: "",
        lastUpdateDate: "",
        isMainProject: false,
      });
    }
  }, [type, data]);

  useEffect(() => {
    if (
      isGetAllMemberListSuccess &&
      isGetAllMemberListSuccess === true &&
      allMemberList
    ) {
      const memberList: UserSummary[] = allMemberList.map((x) => {
        return {
          id: x.userUuid,
          memberId: x.memberUuid,
          nickname: x.nickname,
          profileImage: x.profileUrl,
        } as UserSummary;
      });
      setMemberList(memberList);
    }
  }, [allMemberList, isGetAllMemberListSuccess]);

  useEffect(() => {
    if (
      isGetAllProjectMemberListSuccess &&
      isGetAllProjectMemberListSuccess === true &&
      allProjectMemberList
    ) {
      const projectMemberList: string[] = allProjectMemberList.map(
        (x) => x.userId
      );
      setFormData((prev) => ({
        ...prev,
        projectMemberUuidList: projectMemberList,
      }));
    }
  }, [allProjectMemberList, isGetAllProjectMemberListSuccess]);

  const createMutation = useMutation({
    mutationFn: createOneProject,
  });

  const replaceMutation = useMutation({
    mutationFn: replaceOneProject,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteOneProject,
  });

  useFeedbackHandler({
    isError: createMutation.isError,
    errorMessage:
      "프로젝트를 저장하는 중 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.",
    isSuccess: createMutation.isSuccess,
    successMessage: "프로젝트를 저장했습니다.",
  });

  useFeedbackHandler({
    isError: replaceMutation.isError,
    errorMessage:
      "프로젝트를 수정하는 중 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.",
    isSuccess: replaceMutation.isSuccess,
    successMessage: "프로젝트를 수정했습니다.",
  });

  useFeedbackHandler({
    isError: deleteMutation.isError,
    errorMessage:
      "프로젝트를 삭제하는 중 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.",
    isSuccess: deleteMutation.isSuccess,
    successMessage: "프로젝트를 삭제했습니다.",
  });

  useEffect(() => {
    if (
      (createMutation.isSuccess && createMutation.isSuccess === true) ||
      (replaceMutation.isSuccess && replaceMutation.isSuccess === true)
    ) {
      refetch();
      queryClient.invalidateQueries({ queryKey: ["getProjectList"] });
    }
  }, [createMutation.isSuccess, replaceMutation.isSuccess]);

  useEffect(() => {
    if (deleteMutation.isSuccess && deleteMutation.isSuccess === true) {
      //모달창에서 예/아니오 중 예를 선택하여 삭제가 완료되면 이슈보드로 리다이렉트
      //navigate("/");
    }
  }, [deleteMutation.isSuccess]);

  //저장 버튼
  const handleSaveProjectBtnClicked = () => {
    if (type === "new") {
      createMutation.mutate({
        projectName: formData.projectName,
        writerUuid: "085fe931-da02-456e-b8ff-67d6521a32b4", //임시 고정
        projectContent:
          formData.projectContent !== null ? formData.projectContent : "",
        projectImageFile: formData.projectImageFile ?? null,
        projectTagList: formData.projectTags ?? [],
        startDate:
          formData.projectStartDate !== null
            ? new Date(formData.projectStartDate).toISOString()
            : null,
        endDate:
          formData.projectEndDate !== null
            ? new Date(formData.projectEndDate).toISOString()
            : null,
        createDate:
          formData.projectStartDate !== null
            ? new Date(formData.projectStartDate).toISOString()
            : null,
        memberUuidList: formData.projectMemberUuidList ?? [],
      });
    } else if (selectedProject !== null) {
      replaceMutation.mutate({
        projectId: selectedProject.projectId,
        projectName: formData.projectName,
        updaterUuid: "085fe931-da02-456e-b8ff-67d6521a32b4", //임시 고정
        projectContent:
          formData.projectContent !== null ? formData.projectContent : "",
        projectImageFile: formData.projectImageFile ?? null,
        projectTagList: formData.projectTags ?? [],
        startDate:
          formData.projectStartDate !== null
            ? new Date(formData.projectStartDate).toISOString()
            : null,
        endDate:
          formData.projectEndDate !== null
            ? new Date(formData.projectEndDate).toISOString()
            : null,
        memberUuidList: formData.projectMemberUuidList ?? [],
      });
    }
  };

  //삭제 버튼
  const handleDeleteProjectBtnClicked = () => {
    setShowDeleteFormModal(true);
  };

  //삭제 모달창 확인 버튼
  const handleConfirmModal = (inputText: string) => {
    if (
      selectedProject !== null &&
      selectedProject.projectId &&
      inputText !== null
    ) {
      if (selectedProject.projectName === inputText) {
        deleteMutation.mutate(selectedProject.projectId);
        setShowDeleteFormModal(false);
      } else {
        showSetDeleteFormMoalInvalidText(true);
      }
    }
  };

  //각 입력란 change 이벤트
  const handleInputChange = (
    field: keyof ProjectFormData,
    value: string | string[] | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.[0]) {
      const file = e.currentTarget.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (event) => {
        handleInputChange("projectImageUrl", event.target?.result as string);
        handleInputChange("projectImageFile", file);
      };
    }
  };

  return (
    <div>
      <Box>
        <Grid container>
          <Grid item container xs={12} sx={{ marginBottom: "20px" }}>
            <Grid item xs={6}>
              <InputLabel
                htmlFor="프로젝트 세부 정보"
                sx={{ fontSize: "23px", fontWeight: "bold", mb: 1 }}
              >
                프로젝트 세부 정보
              </InputLabel>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{ mb: 1, p: 0, display: "flex", justifyContent: "right" }}
              >
                <Button
                  type="submit"
                  startIcon={<SaveAsIcon />}
                  sx={{
                    width: "120px",
                    height: "30px",
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.background.default,
                    marginRight: "10px",
                  }}
                  disabled={isLoading}
                  onClick={handleSaveProjectBtnClicked}
                >
                  저장
                </Button>
                <Button
                  type="submit"
                  startIcon={<DeleteIcon />}
                  sx={{
                    width: "120px",
                    height: "30px",
                    backgroundColor: "#dae0e8",
                    color: theme.palette.primary.main,
                  }}
                  disabled={isLoading}
                  onClick={handleDeleteProjectBtnClicked}
                >
                  삭제
                </Button>
              </Box>
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
        </Grid>
        <Grid container>
          <Grid item xs={12} md={7}>
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                height={250}
                width={200}
                sx={{ borderRadius: "4px" }}
              />
            ) : (
              <Box
                sx={{
                  mb: 1,
                  p: 0,
                }}
              >
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  sx={{
                    height: "250px",
                    width: "200px",
                    backgroundColor: theme.palette.background.paper,
                    "&:hover": {
                      backgroundColor: "#C2C6D6",
                    },
                    backgroundImage: `url('${formData.projectImageUrl}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                  }}
                >
                  <input type="file" hidden onChange={handleFileChanged} />
                  {!formData.projectImageUrl && (
                    <AddCircleRoundedIcon
                      sx={{ marginRight: 0, color: theme.palette.text.primary }}
                      fontSize="large"
                    />
                  )}
                </Button>
              </Box>
            )}
          </Grid>
          <Grid item container xs={12} md={5} rowSpacing={4}>
            <Grid item xs={3}>
              <InputLabel htmlFor="이름" sx={{ fontWeight: "bold", mb: 1 }}>
                이름
              </InputLabel>
            </Grid>
            <Grid item xs={9}>
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  height={40}
                  sx={{ borderRadius: "4px" }}
                />
              ) : (
                <TextField
                  fullWidth
                  color="secondary"
                  value={formData.projectName}
                  onChange={(e) =>
                    handleInputChange("projectName", e.target.value)
                  }
                  InputProps={{
                    sx: {
                      fontSize: "0.9rem",
                      height: "40px",
                    },
                  }}
                />
              )}
            </Grid>
            <Grid item xs={3}>
              <InputLabel htmlFor="상세내용" sx={{ fontWeight: "bold", mb: 1 }}>
                상세내용
              </InputLabel>
            </Grid>
            <Grid item xs={9}>
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  height={100}
                  sx={{ borderRadius: "4px" }}
                />
              ) : (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  color="secondary"
                  value={formData.projectContent}
                  onChange={(e) =>
                    handleInputChange("projectContent", e.target.value)
                  }
                  InputProps={{
                    sx: {
                      fontSize: "0.9rem",
                      height: "100px",
                    },
                  }}
                />
              )}
            </Grid>
            <Grid item xs={3}>
              <InputLabel htmlFor="구성원" sx={{ fontWeight: "bold", mb: 1 }}>
                구성원
              </InputLabel>
            </Grid>
            <Grid item xs={9}>
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  height={100}
                  sx={{ borderRadius: "4px" }}
                />
              ) : (
                <SelectableProjectMember
                  memberUuidList={memberList}
                  selectedMemberUuidList={formData.projectMemberUuidList ?? []}
                  onSelectedMemberChanged={(value) =>
                    handleInputChange("projectMemberUuidList", value)
                  }
                />
              )}
            </Grid>
            <Grid item xs={3}>
              <InputLabel htmlFor="기간" sx={{ fontWeight: "bold", mb: 1 }}>
                기간
              </InputLabel>
            </Grid>
            <Grid item xs={9}>
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
                  selectedStartDate={formData.projectStartDate}
                  selectedEndDate={formData.projectEndDate}
                  onStartDateSelectionChange={(value) =>
                    handleInputChange("projectStartDate", value)
                  }
                  onEndDateSelectionChange={(value) =>
                    handleInputChange("projectEndDate", value)
                  }
                />
              )}
            </Grid>
            <Grid item xs={3}>
              <InputLabel htmlFor="태그" sx={{ fontWeight: "bold", mb: 1 }}>
                태그
              </InputLabel>
            </Grid>
            <Grid item xs={9}>
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  height={45}
                  sx={{ borderRadius: "4px" }}
                />
              ) : (
                <TagChipMaker
                  tagList={formData.projectTags}
                  onTagSelectionChange={(value) =>
                    handleInputChange("projectTags", value)
                  }
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {(createMutation.isLoading ||
        replaceMutation.isLoading ||
        deleteMutation.isLoading) && <Spinner centerInViewport size={70} />}
      {selectedProject && selectedProject.projectId && (
        <OneFormModal
          isOpen={showDeleteFormModal}
          title={"프로젝트 삭제"}
          contentName={selectedProject.projectName}
          contentText={
            "프로젝트를 정말 삭제하시겠습니까? 프로젝트명을 입력후 삭제 버튼을 눌러주세요."
          }
          invalidText={"올바른 프로젝트명을 입력해주세요."}
          showInvalidText={showDeleteFormMoalInvalidText}
          handleConfirm={handleConfirmModal}
          handleModalClose={() => setShowDeleteFormModal(false)}
        ></OneFormModal>
      )}
    </div>
  );
};

export default ProjectPage;
