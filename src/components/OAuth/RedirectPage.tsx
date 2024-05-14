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

  const { data, refetch } = useQuery(
    "kakaoLogin",
    () => fetchKakaoLogin(code),
    {
      onSuccess: (data) => {
        if (data) {
          setUserInfo({ ...userInfo, memberId: data });
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
