import { fetchKakaoLogin } from "@/apis/oauthApi";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

const RedirectPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");

  const navigate = useNavigate();

  const { data, refetch } = useQuery(
    "kakaoLogin",
    () => fetchKakaoLogin(code),
    {
      onSuccess: (data) => {
        if (data) {
          navigate("/");
        }
      },
    }
  );

  useEffect(() => {
    if (code) {
      refetch();
    }
  }, [code]);

  return <Box>잠시만 기다려주세요.</Box>;
};

export default RedirectPage;
