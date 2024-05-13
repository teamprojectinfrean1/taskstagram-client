import theme from "@/theme/theme";
import { useEffect, useState } from "react";
import SocialIcons from "../OAuth/SocialIcons";
import AuthMenuOptions from "./AuthMenuOptions";
import { fetchLogin, fetchLoginRequest } from "@/apis/user/fetchLogin";
import { Box, Button, Divider, OutlinedInput, Typography } from "@mui/material";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfoState } from "@/stores/userStore";
import ErrorHandling from "../ErrorHandling";

const LoginForm = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const mutateLogin = useMutation(({ id, password }: fetchLoginRequest) =>
    fetchLogin({ id, password })
  );

  useEffect(() => {
    if (mutateLogin.data) {
      setUserInfo({ ...userInfo, memberId: mutateLogin.data });
      navigate("/");
    }
  }, [mutateLogin.data]);

  return (
    <Box className="base-layout">
      <Typography variant="h5" sx={{ fontWeight: "bold", mt: 8 }}>
        로그인
      </Typography>
      <Typography sx={{ mt: 5, ml: 0.5 }}>ID</Typography>
      <OutlinedInput
        type="email"
        fullWidth
        size="small"
        placeholder={"아이디"}
        sx={{ mt: 1 }}
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <Typography sx={{ mt: 3, ml: 0.5 }}>Password</Typography>
      <OutlinedInput
        type="password"
        fullWidth
        size="small"
        placeholder={"비밀번호"}
        sx={{ mt: 1 }}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onKeyDown={(e) => {
          e.key === "Enter" && mutateLogin.mutate({ id, password });
        }}
      />
      <ErrorHandling
        error={mutateLogin.error}
        isLoading={mutateLogin.isLoading}
        feature="로그인"
      />
      {typeof mutateLogin.error === "number" && (
        <Box
          sx={{
            mt: 2,
            color: `${theme.palette.error.main}`,
            textAlign: "center",
          }}
        >
          <Typography fontSize="11px">
            아이디 또는 비밀번호를 잘못 입력했습니다.
          </Typography>
          <Typography fontSize="11px">
            입력하신 내용을 다시 확인해주세요.
          </Typography>
        </Box>
      )}

      <Button
        variant="contained"
        fullWidth
        size="large"
        sx={{
          mt: 3,
          bgcolor: `${theme.palette.secondary.main}`,
          borderRadius: "7px",
        }}
        onClick={() => {
          mutateLogin.mutate({ id, password });
        }}
      >
        로그인
      </Button>

      <Box sx={{ mt: 2 }}>
        <AuthMenuOptions />
      </Box>
      <Divider sx={{ mt: 3 }}>간편 로그인</Divider>
      <SocialIcons />
    </Box>
  );
};

export default LoginForm;
