import { AppBar, IconButton, Toolbar, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SelectableProject from "./Project/SelectableProject";
import ProjectObj from "@/models/ProjectObj";
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
    () => getProjectList("c00dc5dc-2aef-4579-b3fe-cb08b6d6825d")
    //추후 실패시 동작되는 로직도 추가 예정
  );

  const handleChangeMainProject = (selectedProject: ProjectObj | null) => {
    //메인 프로젝트 변경 api 호출
  };

  const handleChangeSelectedProject = (selectedProject: ProjectObj | null) => {
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
