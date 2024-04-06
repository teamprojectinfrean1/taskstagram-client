import PasswordForm from "@/components/MyPage/PasswordForm";
import PermissionForm from "@/components/MyPage/PermissionForm";
import UserInfoForm from "@/components/MyPage/UserInfoForm";
import { Box, Typography, Button } from "@mui/material";
import { Outlet } from "react-router-dom";

const MyPage = () => {

  return (
    <Box sx={{ width: "80%", margin: "auto" }}>
      <Box
        boxShadow={10}
        sx={{
          backgroundColor: "#173665",
          minHeight: "10rem",
          borderRadius: "7px 7px 0 0",
          minWidth: "800px",
        }}
      >
        <Typography variant="h5" sx={{ pl: 3, pt: 2, color: "white" }}>
          MY PAGE
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "#F0F0F0",
          height: "40rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "0 0 7px 7px",
          minWidth: "800px",
        }}
      >
        <Box
          boxShadow={10}
          sx={{
            backgroundColor: "white",
            width: "60%",
            height: "90%",
            borderRadius: "7px",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MyPage;
