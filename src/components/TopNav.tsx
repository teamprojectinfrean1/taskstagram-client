import {
  AppBar,
  IconButton,
  Toolbar,
  useTheme,
  Box,
  Typography,
  Button,
  Avatar,
  MenuItem,
  Tooltip,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SelectableProject from "./Project/SelectableProject";
import { ProjectSummary } from "@/models/Project";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectListState, selectedProjectState } from "@/stores/projectStore";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProjectList, changeMainProject } from "@/apis/ProjectApi";
import { useNavigate } from "react-router-dom";
import basicProfileImage from "@/assets/basicProfileImage.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { userInfoState } from "@/stores/userStore";
import UserProfileDropdown from "./UserProfileDropdown";

type TopNavProps = {
  onMenuClick: () => void;
};

const TopNav = ({ onMenuClick }: TopNavProps) => {
  const userInfo = useRecoilValue(userInfoState);
  const profileImage = userInfo.profileImage;
  const userUuid = userInfo.memberId || "085fe931-da02-456e-b8ff-67d6521a32b4";
  //"3f0351b0-6141-4ed6-ac0c-47c3685045bf"; //임시 고정

  const [selectedProject, setSelectedProject] =
    useRecoilState(selectedProjectState);
  // const [projectDataList, setProjectDataList] = useState<ProjectSummary[]>([]);
  const [projectDataList, setProjectDataList] =
    useRecoilState(projectListState);

  const { data, isSuccess, refetch } = useQuery(
    "getProjectList",
    () => getProjectList(userUuid)
    //추후 실패시 동작되는 로직도 추가 예정
  );

  useEffect(() => {
    if (isSuccess === true) {
      let projectList: ProjectSummary[] = [];
      const mainProjectData = data?.mainProject;
      const noMainProjectDataList = data?.noMainProject ?? [];
      if (mainProjectData && mainProjectData !== null) {
        projectList.push(mainProjectData);
      }
      if (noMainProjectDataList && noMainProjectDataList.length > 0) {
        projectList = projectList.concat(noMainProjectDataList);
      }
      console.log(projectList);
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
    changeMainprojectMuation.mutate(selectedProjectId);
  };

  const handleChangeSelectedProject = (
    selectedProject: ProjectSummary | null
  ) => {
    setSelectedProject(selectedProject);
  };

  // TopNav dropdown
  // const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElUser(e.currentTarget);
  // };

  // const handleCloseUserMenu = (e: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElUser(null);
  // };

  // const settings = ["마이페이지", "로그아웃"];

  // const navigate = useNavigate();
  // const redirectGo = (setting: string) => {
  //   if (setting === "마이페이지") {
  //     navigate("/mypage");
  //   }
  // };

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
        {/* TopNav dropdown */}
        {/* <IconButton
          size="large"
          edge="end"
          onClick={handleOpenUserMenu}
          color="inherit"
          sx={{ p: 0 }}
        >
          <Avatar src={profileImage ? profileImage : basicProfileImage} />
          <KeyboardArrowDownIcon sx={{ color: "#afbaca" }} />
        </IconButton>
        <Menu
          open={!!anchorElUser}
          onClose={handleCloseUserMenu}
          sx={{ mt: "45px" }}
          anchorEl={anchorElUser}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography
                textAlign="center"
                onClick={() => {
                  redirectGo(setting);
                }}
              >
                {setting}
              </Typography>
            </MenuItem>
          ))}
        </Menu> */}
      </Toolbar>
    </AppBar>
  );
};
export default TopNav;
