import theme from "@/theme/theme";
import LogoAndName from "../components/auth/LogoAndName";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const AuthPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: `${theme.palette.background.default}`,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ m: "auto", width: "70%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <LogoAndName />
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
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
