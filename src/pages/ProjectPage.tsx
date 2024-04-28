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
  Backdrop,
  CircularProgress,
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
import { UserSummary } from "@/models/User";

const ProjectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const type = location.state !== null ? location.state.type : "";
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
  const userUuidList = [
    {
      id: "user1",
      nickname: "user1",
      //이미지 임시고정
      profileImage:
        "https://weaver-s3-bucket.s3.ap-northeast-2.amazonaws.com/images/9609d257-e6dc-4e30-811c-a06d50bda686_save.jpeg",
    } as UserSummary,
    {
      id: "user2",
      nickname: "user2",
      profileImage:
        "https://weaver-s3-bucket.s3.ap-northeast-2.amazonaws.com/images/39e4f374-2c99-4e93-98a7-893084709d95_cat.png",
    } as UserSummary,
    { id: "user3", nickname: "user3", profileImage: null } as UserSummary,
    { id: "user4", nickname: "user4", profileImage: null } as UserSummary,
    { id: "user5", nickname: "user5", profileImage: null } as UserSummary,
    { id: "user6", nickname: "user6", profileImage: null } as UserSummary,
    { id: "user7", nickname: "user7", profileImage: null } as UserSummary,
    { id: "user8", nickname: "user8", profileImage: null } as UserSummary,
    { id: "user9", nickname: "user9", profileImage: null } as UserSummary,
    {
      id: "user1000000000",
      nickname: "user1000000000",
      profileImage: null,
    } as UserSummary,
    {
      id: "user111111111111111111111",
      nickname: "user111111111111111111111",
      profileImage: null,
    } as UserSummary,
    {
      id: "user1222222222222222222222222222",
      nickname: "user1222222222222222222222222222",
      profileImage: null,
    } as UserSummary,
    {
      id: "user133333333333333333333333333333333333",
      nickname: "user133333333333333333333333333333333333",
      profileImage: null,
    } as UserSummary,
  ];
  const selectedProject = useRecoilValue(selectedProjectState);

  const { data, isLoading } = useQuery(
    ["getProjectDetail", selectedProject],
    () =>
      getProjectDetail(
        selectedProject !== null ? selectedProject.projectId : null
      ),
    { enabled: !!selectedProject && !!selectedProject.projectId }
  );

  const createMutation = useMutation({
    mutationFn: createOneProject,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getProjectDetail"] });
    },
  });

  const replaceMutation = useMutation({
    mutationFn: replaceOneProject,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getProjectDetail"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteOneProject,
  });

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
        projectTags: data.projectTagList,
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

  //저장 버튼
  const handleSaveProjectBtnClicked = () => {
    if (type === "new") {
      createMutation.mutate({
        projectName: formData.projectName,
        writerUuid: "3f0351b0-6141-4ed6-ac0c-47c3685045bf", //임시 고정
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
        memberUuidList: formData.projectMemberUuidList ?? [
          "3f0351b0-6141-4ed6-ac0c-47c3685045bf", //임시 고정
        ],
      });
    } else if (selectedProject !== null) {
      replaceMutation.mutate({
        projectId: selectedProject.projectId,
        projectName: formData.projectName,
        updaterUuid: "3f0351b0-6141-4ed6-ac0c-47c3685045bf", //임시 고정
        projectContent:
          formData.projectContent !== null ? formData.projectContent : "",
        projectTagList: formData.projectTags,
        startDate:
          formData.projectStartDate !== null
            ? new Date(formData.projectStartDate).toISOString()
            : null,
        endDate:
          formData.projectEndDate !== null
            ? new Date(formData.projectEndDate).toISOString()
            : null,
        memberUuidList: formData.projectMemberUuidList,
      });
    }
  };

  //삭제 버튼
  const handleDeleteProjectBtnClicked = () => {
    if (selectedProject !== null && selectedProject.projectId) {
      deleteMutation.mutate(selectedProject.projectId);
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
                  onClick={handleDeleteProjectBtnClicked}
                >
                  삭제
                </Button>
              </Box>
              <Typography
                align="right"
                variant="body2"
                sx={{ color: grey[600] }}
              >
                {formData.lastUpdateDate}
              </Typography>
              <Typography
                align="right"
                variant="body2"
                sx={{ color: grey[600] }}
              >
                {formData.lastUpdateUserNickname}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                mb: 1,
                p: 0,
                // display: "flex",
                // justifyContent: "center",
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
                  backgroundColor: "#dae0e8",
                  "&:hover": {
                    backgroundColor: "#c3cede",
                  },
                  backgroundImage: `url('${formData.projectImageUrl}')`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                }}
              >
                <input type="file" hidden onChange={handleFileChanged} />
                {!formData.projectImageUrl && (
                  <AddCircleRoundedIcon
                    sx={{ marginRight: 0 }}
                    fontSize="large"
                  />
                )}
              </Button>
            </Box>
          </Grid>
          <Grid item container xs={12} md={5} rowSpacing={4}>
            <Grid item xs={3}>
              <InputLabel htmlFor="이름" sx={{ fontWeight: "bold", mb: 1 }}>
                이름
              </InputLabel>
            </Grid>
            <Grid item xs={9}>
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
            </Grid>
            <Grid item xs={3}>
              <InputLabel htmlFor="상세내용" sx={{ fontWeight: "bold", mb: 1 }}>
                상세내용
              </InputLabel>
            </Grid>
            <Grid item xs={9}>
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
            </Grid>
            <Grid item xs={3}>
              <InputLabel htmlFor="구성원" sx={{ fontWeight: "bold", mb: 1 }}>
                구성원
              </InputLabel>
            </Grid>
            <Grid item xs={9}>
              <SelectableProjectMember
                memberUuidList={userUuidList}
                selectedMemberUuidList={formData.projectMemberUuidList}
                onSelectedMemberChanged={(value) =>
                  handleInputChange("projectMemberUuidList", value)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <InputLabel htmlFor="기간" sx={{ fontWeight: "bold", mb: 1 }}>
                기간
              </InputLabel>
            </Grid>
            <Grid item xs={9}>
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
            </Grid>
            <Grid item xs={3}>
              <InputLabel htmlFor="태그" sx={{ fontWeight: "bold", mb: 1 }}>
                태그
              </InputLabel>
            </Grid>
            <Grid item xs={9}>
              <TagChipMaker
                tagList={formData.projectTags}
                onTagSelectionChange={(value) =>
                  handleInputChange("projectTags", value)
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default ProjectPage;
