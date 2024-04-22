import { useState, Fragment } from "react";
import TopNav from "@/components/TopNav";
import SideNav from "@/components/SideNav";
import { Outlet } from "react-router-dom";
import { Backdrop, Box } from "@mui/material";
import { useQuery } from "react-query";
import { getUserInfo } from "@/apis/userApi";
import { useSetRecoilState } from "recoil";
import { userInfoState } from "@/stores/userStore";
import Snackbar from "@/components/Snackbar";

const PageLayout = () => {
  
  // 사용자 정보 recoil에 담는 코드  
  const setUserInfo = useSetRecoilState(userInfoState);
  const { data } = useQuery("userInfo", () => getUserInfo(), {
    onSuccess: (data) => {
      if (data) {
        setUserInfo(data);
      }
    },
  });

  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const handleClose = () => {
    setIsSideNavOpen(false);
  };

  return (
    <Fragment>
      <TopNav onMenuClick={() => setIsSideNavOpen((prev) => !prev)} />
      <SideNav open={isSideNavOpen} />
      <Backdrop
        open={isSideNavOpen}
        onClick={handleClose}
        sx={{ zIndex: (theme) => theme.zIndex.drawer - 1 }}
      />
      <Snackbar />
      <Box
        component="main"
        sx={{
          width: { sm: "100%", lg: "80%" },
          height: "calc(100% - var(--top-nav-height))",
          marginLeft: isSideNavOpen ? "var(--side-nav-width)" : "0",
          transition: "margin-left 0.5s ease-out",
          justifyContent: "center",
          m: "auto",
          p: 4,
        }}
      >
        <Outlet />
      </Box>
    </Fragment>
  );
};

export default PageLayout;
