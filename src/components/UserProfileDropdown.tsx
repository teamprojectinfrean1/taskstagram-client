import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInfoState } from "@/stores/userStore";
import { IconButton, Avatar, MenuItem, Typography, Menu } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRecoilValue } from "recoil";
import basicProfileImage from "@/assets/basicProfileImage.png";
import { useQuery } from "react-query";
import { fetchLogout } from "@/apis/user/fetchLogout";

const UserProfileDropdown = () => {
  const navigate = useNavigate();

  const userInfo = useRecoilValue(userInfoState);
  const profileImage = userInfo.profileImage;

  const { data, refetch } = useQuery("logout", () => fetchLogout(), {
    enabled: false,
    cacheTime: 0,
  });

  useEffect(() => {
    if (data) {
      navigate("/auth/login");
    }
  });

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(null);
  };

  const settings = ["마이페이지", "로그아웃"];

  const handleRedirect = (setting: string) => {
    if (setting === "마이페이지") {
      navigate("/mypage");
    } else {
      refetch();
    }
  };
  return (
    <>
      <IconButton
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
                handleRedirect(setting);
              }}
            >
              {setting}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default UserProfileDropdown;
