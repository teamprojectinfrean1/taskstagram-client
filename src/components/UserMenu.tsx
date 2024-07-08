import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInfoState } from "@/stores/userStore";
import { Box, MenuItem, Typography, Menu } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useRecoilValue, useResetRecoilState } from "recoil";
import basicProfileImage from "@/assets/basicProfileImage.png";
import { useQuery } from "react-query";
import { fetchLogout } from "@/apis/user/fetchLogout";
import theme from "@/theme/theme";
import UserAvatar from "@/components/UserAvatar";

const UserMenu = () => {
  const navigate = useNavigate();

  const userInfo = useRecoilValue(userInfoState);
  const profileImage = userInfo.profileImage;
  const resetUserInfo = useResetRecoilState(userInfoState);

  const { data, refetch } = useQuery("logout", () => fetchLogout(), {
    enabled: false,
    cacheTime: 0,
  });

  useEffect(() => {
    if (data) {
      navigate("/auth/login");
    }
  });

  const resetUserData = () => {
    return resetUserInfo;
  };

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleToggleUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    if (anchorElUser) {
      setAnchorElUser(null);
    } else {
      setAnchorElUser(e.currentTarget);
    }
  };

  const settings = ["마이페이지", "로그아웃"];

  const handleRedirect = (setting: string) => {
    if (setting === "마이페이지") {
      navigate("/mypage");
    } else {
      resetUserData();
      refetch();
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        "&:hover": { cursor: "pointer" },
      }}
      onClick={handleToggleUserMenu}
    >
      <UserAvatar
        imageUrl={profileImage ? profileImage : basicProfileImage}
        size={35}
      />
      {!anchorElUser ? (
        <KeyboardArrowDownIcon sx={{ color: "white", fontSize: 30 }} />
      ) : (
        <KeyboardArrowUpIcon sx={{ color: "white", fontSize: 30 }} />
      )}
      <Menu
        sx={{
          mt: "45px",
          "& .MuiPaper-root": {
            backgroundColor: `${theme.palette.primary.main}`,
            color: `${theme.palette.background.default}`,
          },
        }}
        open={!!anchorElUser}
        onClose={handleToggleUserMenu}
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting}
            onClick={handleToggleUserMenu}
            sx={{
              py: 1,
              px: 3,
              justifyContent: "center",
              "&:hover": {
                backgroundColor: theme.palette.background.light,
              },
            }}
          >
            <Typography
              onClick={() => {
                handleRedirect(setting);
              }}
              sx={{ fontWeight: "bold" }}
            >
              {setting}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default UserMenu;
