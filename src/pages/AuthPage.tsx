import "./AuthPage.css";
import theme from "@/theme/theme";
import LogoAndName from "../components/auth/LogoAndName";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

const AuthPage = () => {
  const location = useLocation();

  const routedSignup = location.pathname == "/auth/signup";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: `${theme.palette.background.default}`,
      }}
    >
      <Box className="base-layout">
        <Box
          sx={
            routedSignup
              ? { display: "flex", justifyContent: "center" }
              : { display: "grid", gridTemplateColumns: "1fr 1fr" }
          }
        >
          {!routedSignup && <LogoAndName />}
          <Box className={routedSignup ? "signup-form-size" : "form-size"}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPage;
