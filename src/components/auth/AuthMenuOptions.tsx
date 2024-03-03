import { Link } from "react-router-dom";

import { Box, Stack, Divider } from "@mui/material";

const AuthMenuOptions = () => {
  return (
    <Box className="base-layout">
      <Stack
        direction="row"
        spacing={5}
        alignItems="center"
        sx={{ fontSize: 11 }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Link to="/auth/find/email" className="link-style">
          이메일 찾기
        </Link>
        <Link to="/auth/find/password" className="link-style">
          비밀번호 찾기
        </Link>
        <Link to="/auth/signup/required" className="link-style">
          회원가입
        </Link>
      </Stack>
    </Box>
  );
};

export default AuthMenuOptions;
