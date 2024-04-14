import { Box, Grid, Typography, Button } from "@mui/material";
import UserInfoForm from "./UserInfoForm";
import PasswordForm from "./PasswordForm";
import PermissionForm from "./PermissionForm";
import ChangeProfileImage from "./ChangeProfileImage";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState } from "react";
import { Link } from "react-router-dom";

const UserInfo = () => {
  const [permissionClick, setPermissionClick] = useState(false);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          boxShadow={10}
          sx={{
            p: 5,
            height: "90%",
            backgroundColor: "white",
            minWidth: "600px",
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
              border: "1px solid #626262",
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
                  <Typography variant="body2" sx={{ mt: 1, color: "#626262" }}>
                    자신이 속한 프로젝트를 볼수 있습니다.
                  </Typography>
                </Box>
                <Box
                // sx={{ display: "flex", justifyContent: "flex-end" }}
                >
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
          <Box sx={{mt:2, mr:1}}>
            <Link to="/">
              <Typography
                textAlign="right"
                sx={{ textAlign: "right", color: "#626262" }}
              >
                회원탈퇴
              </Typography>
            </Link>
          </Box>
        </Box>
        {permissionClick && <PermissionForm />}
      </Box>
    </>
  );
};

export default UserInfo;
