import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ProjectAutoComplete from "./Project/ProjectAutoComplete";
import ProjectObj from "@/models/ProjectObj";
import { useRecoilState } from "recoil";
import { projectListState } from "@/stores/Store";
import { useEffect } from "react";

type TopNavProps = {
  onMenuClick: () => void;
};

function TopNav({ onMenuClick }: TopNavProps) {
  const [projectList, setProjectList] = useRecoilState(projectListState);

  //추후 전체 project 조회로 변경
  useEffect(() => {
    const projectA = {
      projectId: "1",
      projectName: "ProjectA",
      isMainProejct: false,
    } as ProjectObj;
    const projectB = {
      projectId: "2",
      projectName: "ProjectB",
      isMainProejct: true,
    } as ProjectObj;
    setProjectList([projectA, projectB]);
  }, []);

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
        <ProjectAutoComplete projects={projectList} />
      </Toolbar>
    </AppBar>
  );
}
export default TopNav;
