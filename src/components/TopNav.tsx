import { AppBar, IconButton, Toolbar, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SelectableProject from "./Project/SelectableProject";
import Project from "@/models/Project";
import { useRecoilState } from "recoil";
import { selectedProjectState } from "@/stores/Store";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProjectList, changeMainProject } from "@/apis/ProjectApi";

type TopNavProps = {
  onMenuClick: () => void;
};

function TopNav({ onMenuClick }: TopNavProps) {
  const [selectedProject, setSelectedProject] =
    useRecoilState(selectedProjectState);
  const queryClient = useQueryClient();

  const { data } = useQuery(
    "getProjectList",
    () => getProjectList("07c7ac1c-e1a9-4b54-9ef5-5f13884c8077")
    //추후 실패시 동작되는 로직도 추가 예정
  );

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
