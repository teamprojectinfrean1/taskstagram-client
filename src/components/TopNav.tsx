import { AppBar, IconButton, Toolbar, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { SelectableProject } from "@/components/Project";
import { ProjectSummary } from "@/models/Project";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectListState, selectedProjectState } from "@/stores/projectStore";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { getProjectList, changeMainProject } from "@/apis/ProjectApi";
import { userInfoState } from "@/stores/userStore";
import { UserProfileDropdown } from "@/components";
import useFeedbackHandler from "@/hooks/useFeedbackHandler";

type TopNavProps = {
  onMenuClick: () => void;
};

const TopNav = ({ onMenuClick }: TopNavProps) => {
  const userInfo = useRecoilValue(userInfoState);
  const userUuid = userInfo.memberId || "085fe931-da02-456e-b8ff-67d6521a32b4";
  //"3f0351b0-6141-4ed6-ac0c-47c3685045bf"; //임시 고정

  const [selectedProject, setSelectedProject] =
    useRecoilState(selectedProjectState);
  // const [projectDataList, setProjectDataList] = useState<ProjectSummary[]>([]);
  const [projectDataList, setProjectDataList] =
    useRecoilState(projectListState);

  const { data, isSuccess, refetch, isError } = useQuery(
    ["getProjectList", userUuid],
    () => getProjectList(userUuid)
  );

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
      setProjectDataList(projectList);
      setSelectedProject(projectList[0]);
    }
  }, [data, isSuccess]);

  const changeMainprojectMuation = useMutation({
    mutationFn: changeMainProject,
  });

  useEffect(() => {
    if (
      changeMainprojectMuation.isSuccess &&
      changeMainprojectMuation.isSuccess === true
    ) {
      refetch();
    }
  }, [changeMainprojectMuation.isSuccess]);

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
    <AppBar position="static">
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
        <UserProfileDropdown />
      </Toolbar>
    </AppBar>
  );
};
export default TopNav;
