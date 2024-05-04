import theme from "@/theme/theme";
import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const MyPage = () => {
  return (
    <>
      <Box
        boxShadow={10}
        sx={{
          backgroundColor: `${theme.palette.secondary.main}`,
          minHeight: "10rem",
          borderRadius: "7px 7px 0 0",
          minWidth: "62rem",
        }}
      >
        <Typography variant="h5" sx={{ pl: 3, pt: 2, color: "white" }}>
          MY PAGE
        </Typography>
      </Box>
      <Box
        boxShadow={10}
        sx={{
          backgroundColor: '#F0F0F0',
          height: "40rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "0 0 7px 7px",
          minWidth: "62rem",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default MyPage;
