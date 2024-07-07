import { Box, Typography, IconButton, Button } from "@mui/material";
import {
  ChangeProfileImage,
  PasswordForm,
  PermissionForm,
  UserInfoForm,
} from "@/components/MyPage";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState } from "react";
import theme from "@/theme/theme";
import DeleteUserModal from "./DeleteUserModal";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/stores/userStore";

const UserProfileLayout = () => {
  const [open, setOpen] = useState(false);

  const [permissionClick, setPermissionClick] = useState(false);

  const userInfo = useRecoilValue(userInfoState);
  const weaver = userInfo.weaver;

  return (
    <Box display="flex">
      <Box
        boxShadow={2}
        sx={{
          py: 3,
          px: 5,
          backgroundColor: `${theme.palette.background.paper}`,
          minWidth: "37rem",
          width: "70%",
          borderRadius: "7px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ChangeProfileImage />
        </Box>
        <UserInfoForm />
        <PasswordForm />
        <Box
          sx={{
            border: `1px solid ${theme.palette.text.primary}`,
            mt: 5,
            py: 2,
            borderRadius: "7px",
            backgroundColor: "white",
          }}
        >
          <Box sx={{ width: "90%", mx: "auto" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  나의 프로젝트 정보
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: `${theme.palette.text.primary}` }}
                >
                  자신이 속한 프로젝트와 역할을 확인할 수 있습니다.
                </Typography>
              </Box>
              <Box>
                <Button
                  onClick={() => {
                    setPermissionClick(!permissionClick);
                  }}
                >
                  {permissionClick ? (
                    <ArrowBackIosNewIcon sx={{ color: "#D9D9D9" }} />
                  ) : (
                    <ArrowForwardIosIcon sx={{ color: "#D9D9D9" }} />
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 4, mr: 1, display: "flex", justifyContent: "end" }}>
          {weaver ? (
            <Button
              onClick={() => {
                setOpen(true);
              }}
            >
              <Typography
                sx={{
                  color: `${theme.palette.text.primary}`,
                }}
              >
                회원탈퇴
              </Typography>
            </Button>
          ) : (
            <></>
          )}
        </Box>
      </Box>
      <DeleteUserModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
      {permissionClick && <PermissionForm />}
    </Box>
  );
};

export default UserProfileLayout;