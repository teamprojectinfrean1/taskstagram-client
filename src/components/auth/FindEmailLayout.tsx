import "./Auth.css";
import { Link, Outlet } from "react-router-dom";
import { Box, Typography, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const FindEmailLayout = () => {
  return (
    <>
      <Link to="/auth/login">
        <ArrowBackIcon fontSize="large" sx={{ m: 3, color: "#5F6368" }} />
      </Link>
      <Box className="find-layout">
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            이메일 찾기
          </Typography>
          <Divider sx={{ mt: 4, mb: 3 }} />
        </Box>
        <Outlet />
      </Box>
    </>
  );
};

export default FindEmailLayout;
