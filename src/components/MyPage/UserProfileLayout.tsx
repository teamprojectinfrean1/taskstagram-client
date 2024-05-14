import { Box, Typography, Button } from "@mui/material";
import UserInfoForm from "./UserInfoForm";
import PasswordForm from "./PasswordForm";
import PermissionForm from "./PermissionForm";
import ChangeProfileImage from "./ChangeProfileImage";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState } from "react";
import { Link } from "react-router-dom";
import theme from "@/theme/theme";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/stores/userStore";

const UserProfileLayout = () => {
  const [permissionClick, setPermissionClick] = useState(false);

  // const userInfo = useRecoilValue(userInfoState)
  // const loginType = "WEAVER"

  // const { data, refetch } = useQuery("reissue", () => reissueCheck(loginType), {
  //   enabled: false,
  //   cacheTime: 0,
  // });

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          boxShadow={10}
          sx={{
            py: 3,
            px: 5,
            backgroundColor: "white",
            minWidth: "37rem",
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
              mt: 3,
              py: 2,
              borderRadius: "7px",
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
                    Permission
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, color: `${theme.palette.text.primary}` }}
                  >
                    자신이 속한 프로젝트를 확인할 수 있습니다.
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
          <Box sx={{ mt: 2, mr: 1 }}>
            <Link to="/">
              <Typography
                sx={{
                  textAlign: "right",
                  color: `${theme.palette.text.primary}`,
                }}
              >
                회원탈퇴
              </Typography>
            </Link>
          </Box>
        </Box>
        {/* <Button
          onClick={() => {
            refetch();
          }}
        >
          reissue 체크
        </Button> */}
        {permissionClick && <PermissionForm />}
      </Box>
    </>
  );
};

export default UserProfileLayout;
