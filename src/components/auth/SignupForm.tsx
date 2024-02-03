import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SocialIcons from "../SocialIcons";
import {
  emailCheck,
  passwdCheck,
  passwdDoubleCheck,
  apiAuthTest,
} from "@/utils/authCheck";

import { Box, Button, Divider, OutlinedInput, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SignupForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [passwdDouble, setPasswdDouble] = useState("");

  const [emailFlag, setEmailFlag] = useState(false);
  const [passwdFlag, setPasswdFlag] = useState(false);
  const [passwdDoubleFlag, setPasswdDoubleFlag] = useState(false);

  const effectCheck = () => {
    if (emailFlag && passwdFlag && passwdDoubleFlag) {
      apiAuthTest({email, passwd, passwdDouble})
      navigate("/auth/signup/success", { state: { email } });
    }
  };

  return (
    <>
      <Link to="/auth">
        <ArrowBackIcon fontSize="large" sx={{ m: 3, color: "#5F6368" }} />
      </Link>
      <Box className="base-layout">
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          회원가입
        </Typography>
        {/* 이메일 input */}
        <Typography sx={{ mt: 3, ml: 0.5 }}>Email</Typography>
        <OutlinedInput
          type="email"
          fullWidth
          size="small"
          placeholder={"example@email.com"}
          error={email && !emailCheck(email) ? true : false}
          onBlur={(e) => {
            setEmail(e.target.value);
            setEmailFlag(emailCheck(e.target.value));
          }}
        />
        {email && !emailCheck(email) && (
          <Box className="error-font">
            <Typography sx={{ fontWeight: "bold", fontSize: "11px" }}>
              이메일 형식이 올바르지 않습니다.
            </Typography>
          </Box>
        )}

        {/* 패스워드 input */}
        <Typography sx={{ mt: 2.5, ml: 0.5 }}>Password</Typography>
        <OutlinedInput
          type="password"
          fullWidth
          size="small"
          placeholder={"비밀번호"}
          error={passwd && !passwdCheck(passwd) ? true : false}
          onBlur={(e) => {
            setPasswd(e.target.value);
            setPasswdFlag(passwdCheck(e.target.value));
          }}
        />
        {passwd && !passwdCheck(passwd) && (
          <Box className="error-font">
            <Typography sx={{ fontWeight: "bold", fontSize: "11px" }}>
              영문, 숫자, 특수문자 2가지 이상 포함. 8자 이상 32자 이하(공백
              제외)
            </Typography>
          </Box>
        )}

        {/* 패스워드 확인 input */}
        <Typography sx={{ mt: 2.5, ml: 0.5 }}>Password check</Typography>
        <OutlinedInput
          type="password"
          fullWidth
          size="small"
          placeholder={"비밀번호 확인"}
          error={
            passwdDouble && !passwdDoubleCheck({ passwd, passwdDouble })
              ? true
              : false
          }
          onBlur={(e) => {
            setPasswdDouble(e.target.value);
            setPasswdDoubleFlag(
              passwdDoubleCheck({ passwd, passwdDouble: e.target.value })
            );
          }}
        />
        {passwdDouble && !passwdDoubleCheck({ passwd, passwdDouble }) && (
          <Box className="error-font">
            <Typography sx={{ fontWeight: "bold", fontSize: "11px" }}>
              비밀번호가 일치하지 않습니다.
            </Typography>
          </Box>
        )}
        <Button
          variant="contained"
          size="large"
          sx={{ mt: 3, width: "100%", bgcolor: "#42829E", borderRadius: "8px" }}
          onClick={() => {
            effectCheck();
          }}
        >
          가입하기
        </Button>
        <Divider sx={{ mt: 3 }}>간편 회원가입</Divider>
        <SocialIcons />
      </Box>
    </>
  );
};

export default SignupForm;
