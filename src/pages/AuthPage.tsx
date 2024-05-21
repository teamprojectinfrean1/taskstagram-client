import theme from "@/theme/theme";
import LogoAndName from "@/components/auth/LogoAndName";
import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useEffect } from "react";

const AuthPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isLogin = sessionStorage.getItem("accessToken");
    isLogin && navigate("/");
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: `${theme.palette.background.paper}`,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ m: "auto", width: "70%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            minWidth: "1050px",
          }}
        >
          <LogoAndName />
          <Box
            sx={{
              backgroundColor: `${theme.palette.background.default}`,
              borderRadius: "5%",
              minWidth: "550px",
              height: "570px",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPage;
