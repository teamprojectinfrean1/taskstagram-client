import "./auth/Auth.css";
import { Box, Typography } from "@mui/material";

const LogoAndName = () => {
  return (
    <>
      <Box className="auth-bgcolor">
        <Box sx={{ mt: 40 }}>
          <img src="favicon.ico" alt="..." width={50} />
          <Typography variant="h2">tasktagram</Typography>
          <Box style={{ display: "flex" }}>
            <Box className="small-circle"></Box>
            <Box className="small-circle"></Box>
            <Box className="small-circle"></Box>
            <Box className="small-circle"></Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LogoAndName;
