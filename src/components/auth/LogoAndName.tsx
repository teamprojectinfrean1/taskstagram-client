import { Box, Typography } from "@mui/material";

const LogoAndName = () => {
  return (
    <Box sx={{ my: "auto" }}>
      <img src="favicon.ico" alt="..." width={50} />
      <Box display="flex" sx={{ my: 5 }}>
        <Typography
          variant="h1"
          sx={{ fontFamily: "Pattaya", color: "#173665" }}
        >
          tasks
        </Typography>
        <Typography
          variant="h1"
          sx={{ fontFamily: "Pattaya", color: "#3C4043" }}
        >
          tagram
        </Typography>
      </Box>

      <Box display="flex" sx={{ ml: 3 }}>
        <Box
          sx={{
            borderRadius: "50%",
            width: "120px",
            height: "120px",
            bgcolor: "#dee1e6",
            "& > *": {
              position: "absolute",
              borderRadius: "50%",
              width: "120px",
              height: "120px",
            },
          }}
        >
          <Box sx={{ ml: 10, bgcolor: "#d7dadf" }} />
          <Box sx={{ ml: 20, bgcolor: "#d1d3d8" }} />
          <Box sx={{ ml: 30, bgcolor: "#cbcdd2" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default LogoAndName;
