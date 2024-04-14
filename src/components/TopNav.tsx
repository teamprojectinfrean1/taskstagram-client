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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SelectableProject from "./Project/SelectableProject";
import ProjectObj from "@/models/ProjectObj";
import { useRecoilState } from "recoil";
import { selectedProjectState } from "@/stores/Store";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getProjectList } from "@/apis/ProjectApi";
import basicProfileImage from "@/assets/basicProfileImage.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ArrowDropDown } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";

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

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = (e: any) => {
    setAnchorElUser(null);
  };

  const settings = ["마이페이지", "로그아웃"];

  const navigate = useNavigate()
  const redirectGo = (setting: string) => {
    if (setting === '마이페이지') {
      navigate('/mypage')
    }
  }

  return (
    <>
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
              projects={data ?? []}
              selectedProject={selectedProject}
              onSelectedProjectChanged={handleChangeSelectedProject}
              onClickCheckBox={handleChangeMainProject}
            />
          </Box>
          <IconButton
            size="large"
            edge="end"
            onClick={handleOpenUserMenu}
            color="inherit"
            sx={{ p: 0 }}
          >
            <Avatar src={basicProfileImage} alt="" />
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
                <Typography textAlign="center" onClick={() => {
                  redirectGo(setting)
                }}>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}
export default TopNav;
