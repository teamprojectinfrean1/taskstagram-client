import { fetchKakaoLogin } from "@/apis/oauth/fetchKakaoLogin";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { useRecoilState } from "recoil";
import { userInfoState } from "@/stores/userStore";

const RedirectPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const { data, refetch, error } = useQuery(
    "kakaoLogin",
    () => fetchKakaoLogin(code),
    {
      enabled: false,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (code) {
      refetch();
    }
  }, [code]);

  useEffect(() => {
    if (data) {
      setUserInfo({ ...userInfo, memberId: data });
      navigate("/");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      alert(
        "죄송합니다. 현재 서버 문제로 카카오 로그인을 진행하실 수 없습니다. 잠시 후 다시 시도해주세요."
      );
      navigate("/auth/login");
    }
  }, [error]);

  return <Box>잠시만 기다려주세요.</Box>;
};

export default RedirectPage;
