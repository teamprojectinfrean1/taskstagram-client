import theme from "@/theme/theme";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SocialIcons from "./SocialIcons";
import EmailInput from "./EmailInput";
import PasswdInput from "./PasswdInput";
import PasswdDoubleInput from "./PasswdDoubleInput";
// import NicknameInput from "./NicknameInput";
import { Box, Button, Divider, Typography, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IdInput from "./IdInput";
import { useRecoilState } from "recoil";
import { signupInfoState } from "@/stores/AuthStore";
import { useChangeSignupInfo } from "@/hooks/useChangeSignupInfo";

export type SignupInfoTypes = {
  key: string;
  value: string;
};

type SignupInfoFlagTypes = {
  key: string;
  value: boolean;
};

const SignupFormRequired = () => {
  const navigate = useNavigate();

  const [signupInfo, setSignupInfo] = useRecoilState(signupInfoState);

  const { changeSignupInfo, resetSignupInfo } = useChangeSignupInfo();

  const [signupValidityFlag, setSignupValidityFlag] = useState({
    emailValidityFlag: false,
    idValidityFlag: false,
    passwdValidityFlag: false,
    passwdDoubleValidityFlag: false,
  });

  const [signupDuplicateFlag, setSignupDuplicateFlag] = useState({
    emailDuplicateFlag: false,
    idDuplicateFlag: false,
  });

  const requiredSignupField = {
    emailField: !!(
      signupValidityFlag.emailValidityFlag &&
      signupDuplicateFlag.emailDuplicateFlag
    ),
    idField: !!(
      signupValidityFlag.idValidityFlag && signupDuplicateFlag.idDuplicateFlag
    ),
    passwdField: !!signupValidityFlag.passwdValidityFlag,
    passwdDoubleField: !!signupValidityFlag.passwdDoubleValidityFlag,
  };

  const changeSignupValidityFlag = ({ key, value }: SignupInfoFlagTypes) => {
    setSignupValidityFlag({
      ...signupValidityFlag,
      [key]: value,
    });
  };

  const [requiredSignupInput, setRequiredSignupInput] = useState(false);

  useEffect(() => {
    const requiredInputCheck = Object.values(requiredSignupField).every(
      (flag) => flag === true
    );
    setRequiredSignupInput(requiredInputCheck);
  }, [requiredSignupField]);

  return (
    <>
      <Link to="/auth/login">
        <ArrowBackIcon
          fontSize="large"
          sx={{ m: 3, color: "#5F6368" }}
          onClick={resetSignupInfo}
        />
      </Link>
      <Box className="base-layout">
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          회원가입
        </Typography>
        <EmailInput
          email={signupInfo.email}
          setEmail={(value) => changeSignupInfo({ key: "email", value })}
          emailValidityFlag={signupValidityFlag.emailValidityFlag}
          setEmailValidityFlag={(value) =>
            changeSignupValidityFlag({ key: "emailValidityFlag", value })
          }
          emailDuplicateFlag={signupDuplicateFlag.emailDuplicateFlag}
          setEmailDuplicateFlag={(value) =>
            setSignupDuplicateFlag({
              ...signupDuplicateFlag,
              emailDuplicateFlag: value,
            })
          }
        />
        <IdInput
          id={signupInfo.id}
          setId={(value) => changeSignupInfo({ key: "id", value })}
          idValidityFlag={signupValidityFlag.idValidityFlag}
          setIdValidityFlag={(value) => {
            changeSignupValidityFlag({ key: "idValidityFlag", value });
          }}
          idDuplicateFlag={signupDuplicateFlag.idDuplicateFlag}
          setIdDuplicateFlag={(value) => {
            setSignupDuplicateFlag({
              ...signupDuplicateFlag,
              idDuplicateFlag: value,
            });
          }}
        />
        <PasswdInput
          passwd={signupInfo.passwd}
          setPasswd={(value) => changeSignupInfo({ key: "passwd", value })}
          passwdValidityFlag={signupValidityFlag.passwdValidityFlag}
          setPasswdValidityFlag={(value) =>
            changeSignupValidityFlag({ key: "passwdValidityFlag", value })
          }
        />

        <PasswdDoubleInput
          passwd={signupInfo.passwd}
          // passwdDouble={signupInfo.passwdDouble}
          // setPasswdDouble={(value) => changeSignupInfo({key: "passwdDouble", value})}
          passwdDoubleValidityFlag={signupValidityFlag.passwdDoubleValidityFlag}
          setPasswdDoubleValidityFlag={(value) =>
            changeSignupValidityFlag({ key: "passwdDoubleValidityFlag", value })
          }
        />
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              bgcolor: `${theme.palette.secondary.main}`,
              borderRadius: "7px",
            }}
            disabled={!requiredSignupInput}
            onClick={() => {
              navigate("/auth/signup/optional");
            }}
          >
            계속
          </Button>
        </Box>
        <Divider sx={{ mt: 3 }}>간편 회원가입</Divider>
        <SocialIcons authPage="signup" />
      </Box>
    </>
  );
};

export default SignupFormRequired;
