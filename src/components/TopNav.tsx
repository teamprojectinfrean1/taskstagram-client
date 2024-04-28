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
import { selectedProjectState } from "@/stores/projectStore";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProjectList, changeMainProject } from "@/apis/ProjectApi";
import { useNavigate } from "react-router-dom";
import basicProfileImage from "@/assets/basicProfileImage.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { userInfoState } from "@/stores/userStore";

type TopNavProps = {
  onMenuClick: () => void;
};

const TopNav = ({ onMenuClick }: TopNavProps) => {
  const [selectedProject, setSelectedProject] =
    useRecoilState(selectedProjectState);
  const queryClient = useQueryClient();

  const { data } = useQuery(
    "getProjectList",
    () => getProjectList("3f0351b0-6141-4ed6-ac0c-47c3685045bf")
    //추후 실패시 동작되는 로직도 추가 예정
  );

  // 첫 렌더링에만 호출되어 메인 프로젝트가 선택되도록
  // useEffect(() => {
  //   if (data && data.length > 0) {
  //     const mainProject =
  //       data.find((item) => item.isMainProject === true) ?? null;
  //     setSelectedProject(mainProject);
  //   }
  // }, []);

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

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = (e: any) => {
    setAnchorElUser(null);
  };

  const settings = ["마이페이지", "로그아웃"];

  const navigate = useNavigate();
  const redirectGo = (setting: string) => {
    if (setting === "마이페이지") {
      navigate("/mypage");
    }
  };

  const userInfo = useRecoilValue(userInfoState)
  const profileImage = userInfo.profileImage

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
          {/* <SelectableProject
            projects={data ?? []}
            onSelectedProjectChanged={handleChangeSelectedProject}
            onClickCheckBox={handleChangeMainProject}
          /> */}
        </Box>
        <IconButton
          size="large"
          edge="end"
          onClick={handleOpenUserMenu}
          color="inherit"
          sx={{ p: 0 }}
        >
          <Avatar src={profileImage? profileImage : basicProfileImage} />
          <KeyboardArrowDownIcon sx={{ color: "#afbaca" }} />
        </IconButton>
        <Menu
          sx={{ mt: "45px" }}
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={!!anchorElUser}
          onClose={handleCloseUserMenu}
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
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
export default TopNav;
