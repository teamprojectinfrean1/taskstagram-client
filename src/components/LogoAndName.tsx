import "./auth/Auth.css";
import { Box, Typography } from "@mui/material";

const LogoAndName = () => {
  return (
    <Box sx={{ my: "auto" }}>
      <img src="favicon.ico" alt="..." width={50} />
      <Typography variant="h2">tasktagram</Typography>
      <Box style={{ display: "flex" }}>
        <Box className="small-circle"></Box>
        <Box className="small-circle"></Box>
        <Box className="small-circle"></Box>
        <Box className="small-circle"></Box>
      </Box>
    </Box>
  );
};

export default LogoAndName;
