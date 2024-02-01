import SocialIcons from "../common/SocialIcons";
import FindorJoinLink from "../common/FindorJoinLink";

import { Button, Divider, OutlinedInput } from "@mui/material";

const LoginForm = () => {
  return (
    <>
      <div className="base-layout">
        <h2 style={{ marginTop: 60 }}>로그인</h2>
        <p style={{ marginTop: 40, marginLeft: 3 }}>Email</p>
        <OutlinedInput
          fullWidth
          size="small"
          placeholder={"example@email.com"}
          sx={{ mt: 1 }}
        />
        <p className="form-name">Password</p>
        <OutlinedInput
          fullWidth
          size="small"
          placeholder={"비밀번호"}
          sx={{ mt: 1 }}
        />
        <Button
          variant="contained"
          size="large"
          sx={{ mt: 3, width: "100%", bgcolor: "#42829E", borderRadius: "8px" }}
        >
          로그인
        </Button>
        <div style={{ marginTop: 20 }}>
          <FindorJoinLink />
        </div>
        <Divider sx={{ mt: 3 }}>간편 로그인</Divider>
        <SocialIcons />
      </div>
    </>
  );
};

export default LoginForm;
