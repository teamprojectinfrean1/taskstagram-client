import { useState, Fragment } from "react";
import TopNav from "@/components/TopNav";
import SideNav from "@/components/SideNav";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const PageLayout = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  return (
    <Fragment>
      <TopNav onMenuClick={() => setIsSideNavOpen((prev) => !prev)} />
      <SideNav open={isSideNavOpen} />
      <Box
        component="main"
        sx={{
          width: { sm: "100%", lg: "80%" },
          height: "calc(100% - var(--top-nav-height))",
          marginLeft: isSideNavOpen ? "var(--side-nav-width)" : "0",
          transition: "margin-left 0.5s ease-out",
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
