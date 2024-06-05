import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const MyPage = () => {
  return (
    <>
      <Typography variant="h5" sx={{ ml: 3, mt: 2, mb: 5, color: "black" }}>
        마이 페이지
      </Typography>
      <Outlet />
    </>
  );
};

export default MyPage;
