import { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRouter = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const isLogin = sessionStorage.getItem("accessToken");
    if (!isLogin) {
      navigate("/auth/login");
    }
  });
  return <>{children}</>;
};

export default ProtectedRouter;
