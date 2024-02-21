import theme from "@/theme/theme";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SocialIcons from "../SocialIcons";
import EmailInput from "./EmailInput";
import PasswdInput from "./PasswdInput";
import PasswdDoubleInput from "./PasswdDoubleInput";
import NicknameInput from "./NicknameInput";
import PhoneInput from "./PhoneInput";
import PhoneCertifiInput from "./PhoneCertifiInput";
import { apiAuthTest } from "@/utils/authCheck";
import { Box, Button, Divider, Typography, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type SingupInfoTypes = {
  key: string;
  value: string;
};

type SignupInfoFlagTypes = {
  key: string;
  value: boolean;
};

const SignupForm = () => {
  const navigate = useNavigate();

  const [signupInfo, setSignupInfo] = useState({
    email: "",
    passwd: "",
    passwdDouble: "",
    nickname: "",
    phoneNumber: "",
    phoneCertifi: "",
  });

  const changeSignupInfo = ({ key, value }: SingupInfoTypes) => {
    setSignupInfo({
      ...signupInfo,
      [key]: value,
    });
  };

  const [signupInfoFlag, setSignupInfoFlag] = useState({
    emailFlag: false,
    passwdFlag: false,
    passwdDoubleFlag: false,
    nicknameFlag: false,
    phoneNumberFlag: false,
    phoneCertifiFlag: false,
  });

  const changeSignupInfoFlag = ({ key, value }: SignupInfoFlagTypes) => {
    setSignupInfoFlag({
      ...signupInfoFlag,
      [key]: value,
    });
  };

  const [signupInputValidity, setSignupInputValidity] = useState(false);

  useEffect(() => {
    const totalValidity = Object.values(signupInfoFlag).every(
      (flag) => flag === true
    );
    setSignupInputValidity(totalValidity);
  }, [signupInfoFlag]);

  const [phoneButtonOnClick, setPhoneButtonOnClick] = useState(false);

  const handleSignup = () => {
    const signupFlag = apiAuthTest(signupInfo);
    signupFlag &&
      navigate("/auth/signup/success", { state: { email: signupInfo.email } });
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
          <Grid item xs={5.5}>
            <EmailInput
              email={signupInfo.email}
              emailFlag={signupInfoFlag.emailFlag}
              setEmail={(value) => changeSignupInfo({ key: "email", value })}
              setEmailFlag={(value) =>
                changeSignupInfoFlag({ key: "emailFlag", value })
              }
            />
            <PasswdInput
              passwd={signupInfo.passwd}
              passwdFlag={signupInfoFlag.passwdFlag}
              setPasswd={(value) => changeSignupInfo({ key: "passwd", value })}
              setPasswdFlag={(value) =>
                changeSignupInfoFlag({ key: "passwdFlag", value })
              }
            />

            <PasswdDoubleInput
              passwd={signupInfo.passwd}
              passwdDouble={signupInfo.passwdDouble}
              passwdDoubleFlag={signupInfoFlag.passwdDoubleFlag}
              setPasswdDouble={(value) =>
                changeSignupInfo({ key: "passwdDouble", value })
              }
              setPasswdDoubleFlag={(value) =>
                changeSignupInfoFlag({ key: "passwdDoubleFlag", value })
              }
            />
          </Grid>
          <Grid item xs={1} container justifyContent="center">
            <Divider
              sx={{
                height: "100%",
                borderLeft: "1px solid #979797",
                mt: 2,
              }}
            ></Divider>
          </Grid>
          <Grid item xs={5.5}>
            <NicknameInput
              nickname={signupInfo.nickname}
              nicknameFlag={signupInfoFlag.nicknameFlag}
              setNickname={(value) =>
                changeSignupInfo({ key: "nickname", value })
              }
              setNicknameFlag={(value) =>
                changeSignupInfoFlag({ key: "nicknameFlag", value })
              }
            />
            <Typography sx={{ mt: 2.5, ml: 0.5 }}>휴대폰 번호</Typography>
            <PhoneInput
              phoneNumber={signupInfo.phoneNumber}
              setPhoneNumber={(value) =>
                changeSignupInfo({ key: "phoneNumber", value })
              }
              phoneNumberFlag={signupInfoFlag.phoneNumberFlag}
              setPhoneNumberFlag={(value) =>
                changeSignupInfoFlag({ key: "phoneNumberFlag", value })
              }
              phoneButtonOnClick={phoneButtonOnClick}
              setPhoneButtonOnClick={setPhoneButtonOnClick}
            />
            <PhoneCertifiInput
              phoneCertifi={signupInfo.phoneCertifi}
              phoneNumberFlag={signupInfoFlag.phoneNumberFlag}
              phoneCertifiFlag={signupInfoFlag.phoneCertifiFlag}
              setPhoneCertifi={(value) =>
                changeSignupInfo({ key: "phoneCertifi", value })
              }
              setPhoneCertifiFlag={(value) =>
                changeSignupInfoFlag({ key: "phoneCertifiFlag", value })
              }
              phoneButtonOnClick={phoneButtonOnClick}
            />
          </Grid>
        </Grid>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: `${theme.palette.secondary.main}`,
              borderRadius: "7px",
              width: "400px",
            }}
            disabled={!signupInputValidity}
            onClick={() => {
              handleSignup();
            }}
          >
            가입하기
          </Button>
        </Box>
        <Divider sx={{ mt: 3 }}>간편 회원가입</Divider>
        <SocialIcons authPage="signup"/>
      </Box>
    </>
  );
};

export default SignupForm;
