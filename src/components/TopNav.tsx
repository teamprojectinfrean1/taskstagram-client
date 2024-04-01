import { AppBar, IconButton, Toolbar, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SelectableProject from "./Project/SelectableProject";
import Project from "@/models/Project";
import { useRecoilState } from "recoil";
import { selectedProjectState } from "@/stores/Store";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getProjectList } from "@/apis/ProjectApi";

type TopNavProps = {
  onMenuClick: () => void;
};

function TopNav({ onMenuClick }: TopNavProps) {
  const [selectedProject, setSelectedProject] =
    useRecoilState(selectedProjectState);

  const { data } = useQuery(
    "getProjectList",
    () => getProjectList("07c7ac1c-e1a9-4b54-9ef5-5f13884c8077")
    //추후 실패시 동작되는 로직도 추가 예정
  );

  const handleChangeMainProject = (selectedProject: Project | null) => {
    //메인 프로젝트 변경 api 호출
  };

  const handleChangeSelectedProject = (selectedProject: Project | null) => {
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
          selectedProject={selectedProject}
          onSelectedProjectChanged={handleChangeSelectedProject}
          onClickCheckBox={handleChangeMainProject}
        />
      </Toolbar>
    </AppBar>
  );
}
export default TopNav;
