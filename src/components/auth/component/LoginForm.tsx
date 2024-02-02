import { useState } from "react";
import SocialIcons from "../common/SocialIcons";
import FindorJoinLink from "../common/FindorJoinLink";
import { emailCheck, passwdCheck } from "../../../utils/authCheck";
import LoginModal from "./LoginModal";

import { Button, Divider, OutlinedInput } from "@mui/material";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="base-layout">
        <h2 style={{ marginTop: 60 }}>로그인</h2>
        <p style={{ marginTop: 40, marginLeft: 3 }}>Email</p>
        <OutlinedInput
          type="email"
          fullWidth
          size="small"
          placeholder={"example@email.com"}
          sx={{ mt: 1 }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {/* {email && !emailCheck(email) && <p>확인.</p>} */}
        <p className="form-name">Password</p>
        <OutlinedInput
          type="password"
          fullWidth
          size="small"
          placeholder={"비밀번호"}
          sx={{ mt: 1 }}
          onChange={(e) => {
            setPasswd(e.target.value);
          }}
        />
        {/* {passwd && !passwdCheck(passwd) && <p>확인.</p>} */}
        <Button
          variant="contained"
          size="large"
          sx={{ mt: 3, width: "100%", bgcolor: "#42829E", borderRadius: "8px" }}
          onClick={() => {
            setShowModal(true);
          }}
        >
          로그인
        </Button>
        <div style={{ marginTop: 20 }}>
          <FindorJoinLink />
        </div>
        <Divider sx={{ mt: 3 }}>간편 로그인</Divider>
        <SocialIcons />

        <LoginModal showModal={showModal} setShowModal={setShowModal} />
      </div>
    </>
  );
};

export default LoginForm;
