import { AppBar, IconButton, Toolbar, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SelectableProject from "./Project/SelectableProject";
import { ProjectSummary } from "@/models/Project";
import { useRecoilState } from "recoil";
import { selectedProjectState } from "@/stores/projectStore";
import { useEffect, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProjectList, changeMainProject } from "@/apis/ProjectApi";

type TopNavProps = {
  onMenuClick: () => void;
};

const TopNav = ({ onMenuClick }: TopNavProps) => {
  const [selectedProject, setSelectedProject] =
    useRecoilState(selectedProjectState);
  const queryClient = useQueryClient();

  const { data } = useQuery(
    "getProjectList",
    () => getProjectList("8017b5fb-7b36-414c-b859-6606739a7497")
    //추후 실패시 동작되는 로직도 추가 예정
  );

  //첫 렌더링에만 호출되어 메인 프로젝트가 선택되도록
  useEffect(() => {
    if (data && data.length > 0) {
      const mainProject =
        data.find((item) => item.isMainProject === true) ?? null;
      setSelectedProject(mainProject);
    }
  }, []);

  const changeMainprojectMuation = useMutation({
    mutationFn: changeMainProject,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getProjectList"] });
    },
    //추후 실패시 동작되는 로직도 추가 예정
  });

  const handleChangeMainProject = (selectedProjectId: string | null) => {
    changeMainprojectMuation.mutate(selectedProjectId);
  };

  const handleChangeSelectedProject = (
    selectedProject: ProjectSummary | null
  ) => {
    setSelectedProject(selectedProject);
  };

  return (
    <AppBar position="static">
      <Toolbar>
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
          projects={data ?? []}
          onSelectedProjectChanged={handleChangeSelectedProject}
          onClickCheckBox={handleChangeMainProject}
        />
      </Toolbar>
    </AppBar>
  );
};
export default TopNav;
