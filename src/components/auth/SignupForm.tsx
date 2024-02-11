import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SocialIcons from "../SocialIcons";

import EmailInput from "./EmailInput";
import PasswdInput from "./PasswdInput";
import PasswdDoubleInput from "./PasswdDoubleInput";
import NicknameInput from "./NicknameInput";
import PhoneInput from "./PhoneInput";
import PhoneCertifiInput from "./PhoneCertifiInput";

import { apiAuthTest } from "@/utils/authCheck";

import {
  Box,
  Button,
  Divider,
  OutlinedInput,
  Typography,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SignupForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [passwdDouble, setPasswdDouble] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCertifi, setPhoneCertifi] = useState("");

  const [emailFlag, setEmailFlag] = useState(false);
  const [passwdFlag, setPasswdFlag] = useState(false);
  const [passwdDoubleFlag, setPasswdDoubleFlag] = useState(false);
  const [nicknameFlag, setNicknameFlag] = useState(false);
  const [phoneNumberFlag, setPhoneNumberFlag] = useState(false);
  const [phoneCertifiFlag, setPhoneCertifiFlag] = useState(false);

  const totalEffectCheck = () => {
    if (emailFlag && passwdFlag && passwdDoubleFlag) {
      apiAuthTest({ email, passwd, passwdDouble });
      navigate("/auth/signup/success", { state: { email } });
    }
  };

  return (
    <>
      <Link to="/auth/login">
        <ArrowBackIcon fontSize="large" sx={{ m: 3, color: "#5F6368" }} />
      </Link>
      <Box className="base-layout">
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          회원가입
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={5.9}>
            <EmailInput
              email={email}
              setEmail={setEmail}
              setEmailFlag={setEmailFlag}
            />
            <PasswdInput
              passwd={passwd}
              setPasswd={setPasswd}
              setPasswdFlag={setPasswdFlag}
            />

            <PasswdDoubleInput
              passwd={passwd}
              passwdDouble={passwdDouble}
              setPasswdDouble={setPasswdDouble}
              setPasswdDoubleFlag={setPasswdDoubleFlag}
            />
          </Grid>
          <Grid item xs={0.1}>
            <Divider
              sx={{
                height: "100%",
                borderLeft: "1px solid #979797",
                mt: 2,
              }}
            ></Divider>
          </Grid>
          <Grid item xs={5.9}>
            <NicknameInput
              nickname={nickname}
              setNickname={setNickname}
              setNicknameFlag={setNicknameFlag}
            />
            <PhoneInput
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              phoneNumberFlag={phoneNumberFlag}
              setPhoneNumberFlag={setPhoneNumberFlag}
            />
            <PhoneCertifiInput
              phoneCertifi={phoneCertifi}
              phoneNumberFlag={phoneNumberFlag}
              phoneCertifiFlag={phoneCertifiFlag}
              setPhoneCertifi={setPhoneCertifi}
              setPhoneCertifiFlag={setPhoneCertifiFlag}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          size="large"
          sx={{ mt: 3, width: "100%", bgcolor: "#42829E", borderRadius: "8px" }}
          onClick={() => {
            totalEffectCheck();
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
