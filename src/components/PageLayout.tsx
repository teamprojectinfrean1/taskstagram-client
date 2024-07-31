import { useState, Fragment, useEffect } from "react";
import { SideNav, Snackbar, TopNav } from "@/components";
import { Outlet } from "react-router-dom";
import { Backdrop, Box } from "@mui/material";
import { useQuery } from "react-query";
import { getUserInfo } from "@/apis/memberApi";
import { useRecoilValue, useRecoilState } from "recoil";
import { userInfoState } from "@/stores/userStore";
import { jwtDecode } from "jwt-decode";
import { projectListState } from "@/stores/projectStore";

const PageLayout = () => {
  // 사용자 정보 recoil에 담는 코드
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const { data } = useQuery("userInfo", () => getUserInfo());
  const projectDataList = useRecoilValue(projectListState);

  // memberId 재추출
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!userInfo.memberId && accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const memberId = decodedToken.sub;
      if (memberId) {
        setUserInfo({ ...userInfo, memberId });
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      setUserInfo({
        ...userInfo,
        email: data.email,
        id: data.id,
        nickname: data.nickname,
        profileImage: data.profileImage,
        userId: data.userOauthUuid,
        weaver: data.weaver,
      });
    }
  }, [data]);

  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen((prev) => !prev);
  };

  const closeSideNav = () => {
    setIsSideNavOpen(false);
  };

  return (
    <Fragment>
      <TopNav onMenuClick={toggleSideNav} />
      {projectDataList?.length > 0 && <SideNav open={isSideNavOpen} />}
      <Backdrop
        open={isSideNavOpen}
        onClick={closeSideNav}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer - 1,
        }}
      />
      <Snackbar />
      <Box
        className="custom-scrollbar"
        sx={{
          width: "100%",
          height: "calc(100% - var(--top-nav-height))",
          justifyContent: "center",
          py: 4,
          px: { sm: 4, lg: 20 },
        }}
      >
        <Outlet />
      </Box>
    </Fragment>
  );
};

export default PageLayout;
