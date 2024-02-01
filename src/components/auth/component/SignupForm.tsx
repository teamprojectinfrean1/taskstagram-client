import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SocialIcons from "../common/SocialIcons";
import {
  emailCheck,
  passwdCheck,
  passwdDoubleCheck,
} from "../../../utils/authCheck";

import { Button, Divider, OutlinedInput } from "@mui/material";
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
      navigate("/signup/success");
    }
  };

  return (
    <>
      <Link to="/login">
        <ArrowBackIcon fontSize="large" sx={{ m: 3, color: "#5F6368" }} />
      </Link>
      <div className="base-layout">
        <h2>회원가입</h2>

        {/* 이메일 input */}
        <p className="form-name">Email</p>
        <OutlinedInput
          type="email"
          fullWidth
          size="small"
          placeholder={"example@email.com"}
          sx={{ mt: 1 }}
          error={email && !emailCheck(email) ? true : false}
          onBlur={(e) => {
            setEmail(e.target.value);
            setEmailFlag(emailCheck(e.target.value));
          }}
        />
        {email && !emailCheck(email) && (
          <p className="error-font">이메일 형식이 올바르지 않습니다.</p>
        )}

        {/* 패스워드 input */}
        <p className="form-name">Password</p>
        <OutlinedInput
          type="password"
          fullWidth
          size="small"
          placeholder={"비밀번호"}
          sx={{ mt: 1 }}
          error={passwd && !passwdCheck(passwd) ? true : false}
          onBlur={(e) => {
            setPasswd(e.target.value);
            setPasswdFlag(passwdCheck(e.target.value));
          }}
        />
        {passwd && !passwdCheck(passwd) && (
          <p className="error-font">
            영문, 숫자, 특수문자 2가지 이상 포함. 8자 이상 32자 이하(공백 제외)
          </p>
        )}

        {/* 패스워드 확인 input */}
        <p className="form-name">Password check</p>
        <OutlinedInput
          type="password"
          fullWidth
          size="small"
          placeholder={"비밀번호 확인"}
          sx={{ mt: 1 }}
          error={
            passwdDouble && !passwdDoubleCheck({ passwd, passwdDouble })
              ? true
              : false
          }
          onBlur={(e) => {
            setPasswdDouble(e.target.value);
            setPasswdDoubleFlag(passwdDoubleCheck({ passwd, passwdDouble }));
          }}
        />
        {passwdDouble && !passwdDoubleCheck({ passwd, passwdDouble }) && (
          <p className="error-font">비밀번호가 일치하지 않습니다.</p>
        )}
        <div>
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              width: "100%",
              bgcolor: "#42829E",
              borderRadius: "8px",
            }}
            onClick={() => {
              effectCheck();
            }}
          >
            가입하기
          </Button>
        </div>
        <Divider sx={{ mt: 3 }}>간편 회원가입</Divider>
        <SocialIcons />
      </div>
    </>
  );
};

export default SignupForm;
