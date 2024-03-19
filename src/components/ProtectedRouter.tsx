import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRouter = () => {

  const navigate = useNavigate();
  // // // 토큰이 존재하면 메인 페이지로 이동, 없으면 로그인 페이지로 이동
  // useEffect(() => {
  //   const accessToken = sessionStorage.getItem("accessToken");
  //   if (accessToken) {
  //     navigate("/");
  //   } else {
  //     navigate("/auth/login");
  //   }
  // }, [navigate]);

  return <></>;
};

export default ProtectedRouter;
