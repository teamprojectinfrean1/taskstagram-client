import "./Auth.css";
import { useState } from "react";
import SocialIcons from "../SocialIcons";
import FindorJoinLink from "../FindorJoinLink";
import { effectCheck } from "@/utils/authCheck";
import LoginModal from "./LoginModal";

import { Box, Button, Divider, OutlinedInput, Typography } from "@mui/material";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Box className="base-layout">
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 8 }}>
          로그인
        </Typography>
        <Typography sx={{ mt: 5, ml: 0.5 }}>Email</Typography>
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
        <Typography sx={{ mt: 3, ml: 0.5 }}>Password</Typography>
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
        <Box sx={{ mt: 2 }}>
          <FindorJoinLink />
        </Box>
        <Divider sx={{ mt: 3 }}>간편 로그인</Divider>
        <SocialIcons />

        <LoginModal showModal={showModal} setShowModal={setShowModal} />
      </Box>
    </>
  );
};

export default LoginForm;
