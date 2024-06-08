import { AppBar, IconButton, Toolbar, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { SelectableProject } from "@/components/Project";
import { ProjectSummary } from "@/models/Project";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  projectListState,
  selectedProjectState,
  projectActingModeState,
} from "@/stores/projectStore";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getProjectList,
  changeMainProject,
  PrjectListResponse,
} from "@/apis/ProjectApi";
import { userInfoState } from "@/stores/userStore";
import { UserMenu } from "@/components";
import useFeedbackHandler from "@/hooks/useFeedbackHandler";

type TopNavProps = {
  onMenuClick: () => void;
};

const TopNav = ({ onMenuClick }: TopNavProps) => {
  const queryClient = useQueryClient();
  const userInfo = useRecoilValue(userInfoState);
  const userUuid = userInfo.memberId || "085fe931-da02-456e-b8ff-67d6521a32b4";
  //"3f0351b0-6141-4ed6-ac0c-47c3685045bf"; //임시 고정

  const [selectedProject, setSelectedProject] =
    useRecoilState(selectedProjectState);
  // const [projectDataList, setProjectDataList] = useState<ProjectSummary[]>([]);
  const [projectDataList, setProjectDataList] =
    useRecoilState(projectListState);
  const projectActingMode = useRecoilValue(projectActingModeState);

  const { data, isSuccess, refetch, isError, isRefetching } = useQuery(
    ["getProjectList", userUuid],
    () => getProjectList(userUuid),
    { enabled: false }
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess === true) {
      let projectList: ProjectSummary[] = [];
      const mainProjectDataList = data?.mainProject ?? [];
      const noMainProjectDataList = data?.noMainProject ?? [];
      if (mainProjectDataList && mainProjectDataList.length > 0) {
        projectList = projectList.concat(mainProjectDataList);
      }
      if (noMainProjectDataList && noMainProjectDataList.length > 0) {
        projectList = projectList.concat(noMainProjectDataList);
      }
      //전체 프로젝트 초기화
      setProjectDataList(projectList);

      //프로젝트 자동 선택
      if (projectActingMode === null || projectActingMode === "Delete") {
        setSelectedProject(projectList[0]);
      } else if (selectedProject !== null && projectActingMode === "Update") {
        const previousSelectedProjectId = selectedProject.projectId;
        const projectData = projectList.find(
          (x) => x.projectId === previousSelectedProjectId
        );
        setSelectedProject(projectData ?? null);
      }
    }
  }, [data, isSuccess, projectActingMode]);

  const changeMainprojectMuation = useMutation({
    mutationFn: changeMainProject,
  });

  useEffect(() => {
    if (
      changeMainprojectMuation.data &&
      changeMainprojectMuation.data.changedProjectId !== null &&
      changeMainprojectMuation.data.isSuccess === true
    ) {
      //refetch하지않고 캐시 데이터를 가공하기
      const oldData = queryClient.getQueryData<PrjectListResponse>([
        "getProjectList",
        userUuid,
      ]);

      if (oldData) {
        const mainProject = oldData.mainProject;
        const noMainProject = oldData.noMainProject.slice();
        const newNoMainProjectData = noMainProject.map((projectItem) => {
          if (
            projectItem.projectId ===
            changeMainprojectMuation.data.changedProjectId
          ) {
            return { ...projectItem, isMainProject: true };
          } else {
            return { ...projectItem, isMainProject: false };
          }
        });

        queryClient.setQueryData<PrjectListResponse>(
          ["getProjectList", userUuid],
          {
            mainProject:
              mainProject.length > 0
                ? [{ ...oldData.mainProject[0], isMainProject: false }]
                : [],
            noMainProject: newNoMainProjectData,
          }
        );
      }
    }
  }, [changeMainprojectMuation.data]);

  const handleChangeMainProject = (selectedProjectId: string | null) => {
    if (selectedProjectId !== null) {
      changeMainprojectMuation.mutate(selectedProjectId);
    }
  };

  const handleChangeSelectedProject = (
    selectedProject: ProjectSummary | null
  ) => {
    setSelectedProject(selectedProject);
  };

  useFeedbackHandler({
    isError: changeMainprojectMuation.isError,
    errorMessage:
      "메인 프로젝트를 변경하는 중 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.",
  });

  return (
    <AppBar
      position="sticky"
      sx={{ 
        // zIndex: (theme) => theme.zIndex.drawer, 
        boxShadow: 0,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <SelectableProject
            projects={projectDataList}
            onSelectedProjectChanged={handleChangeSelectedProject}
            onClickCheckBox={handleChangeMainProject}
          />
        </Box>
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};
export default TopNav;
