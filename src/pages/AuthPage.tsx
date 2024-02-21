import "./AuthPage.css";
import theme from "@/theme/theme";
import LogoAndName from "../components/auth/LogoAndName";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

const AuthPage = () => {
  const location = useLocation();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: `${theme.palette.background.default}` }}>
      <Box className="base-layout">
        {location.pathname !== "/auth/signup" ? (
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <LogoAndName />
            <Box className="form-size" boxShadow={10}>
              <Outlet />
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box className="signup-form-size" boxShadow={10}>
              <Outlet />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AuthPage;
