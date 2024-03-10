import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ProjectAutoComplete from "./Project/ProjectAutoComplete";
import ProjectObj from "@/models/ProjectObj";
import { useRecoilState } from "recoil";
import { projectListState, selectedProjectState } from "@/stores/Store";
import { useEffect } from "react";

type TopNavProps = {
  onMenuClick: () => void;
};

function TopNav({ onMenuClick }: TopNavProps) {
  const [projectList, setProjectList] = useRecoilState(projectListState);
  const [selectedProject, setSelectedProject] =
    useRecoilState(selectedProjectState);

  //추후 전체 project 조회로 변경
  useEffect(() => {
    const projectA = {
      projectId: "1",
      projectName: "ProjectA",
      isMainProject: false,
    } as ProjectObj;
    const projectB = {
      projectId: "2",
      projectName: "ProjectB",
      isMainProject: true,
    } as ProjectObj;
    setProjectList([projectA, projectB]);
  }, []);

  const handleChangeMainProject = (selectedProject: ProjectObj | null) => {
    //setSelectedProject(selectedProject);
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
        <ProjectAutoComplete
          projects={projectList}
          selectedProject={selectedProject}
          onSelectedProjectChanged={handleChangeSelectedProject}
          onClickCheckBox={handleChangeMainProject}
        />
      </Toolbar>
    </AppBar>
  );
}
export default TopNav;
