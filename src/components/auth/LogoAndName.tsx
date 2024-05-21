import { Box, Typography } from "@mui/material";
import logo from "@/assets/taskstagramLogo.svg";

const LogoAndName = () => {
  return (
    <Box sx={{ my: "auto" }}>
      <img src={logo} alt="..." width={300} />
      <Box sx={{ my: 5, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "BM HANNA_TTF",
            color: "#00154B",
            fontWeight: "bold",
          }}
        >
          일정타그램
        </Typography>
      </Box>
    </Box>
  );
};

export default LogoAndName;
