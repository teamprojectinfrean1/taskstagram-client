import theme from "@/theme/theme";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SocialIcons from "./SocialIcons";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import { Box, Button, Divider, Typography, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IdInput from "./IdInput";
import { useRecoilValue } from "recoil";
import { signupInfoState } from "@/stores/authStore";
import { useChangeSignupInfo } from "@/hooks/useChangeSignupInfo";
import PasswordConfirmationInput from "./PasswordConfirmationInput";

type SignupInfoFlagTypes = {
  key: string;
  value: boolean;
};

const SignupFormRequired = () => {
  const navigate = useNavigate();

  const signupInfo = useRecoilValue(signupInfoState);

  const { changeSignupInfo, resetSignupInfo } = useChangeSignupInfo();

  // 회원가입 필수 input 유효성 변수
  const [isValid, setIsValid] = useState({
    emailValidityFlag: false,
    idValidityFlag: false,
    passwordValidityFlag: false,
    passwordDoubleValidityFlag: false,
  });

  const [signupDuplicateFlag, setSignupDuplicateFlag] = useState({
    emailDuplicateFlag: false,
    idDuplicateFlag: false,
  });

  const requiredSignupField = {
    emailField: !!(
      isValid.emailValidityFlag && signupDuplicateFlag.emailDuplicateFlag
    ),
    idField: !!(isValid.idValidityFlag && signupDuplicateFlag.idDuplicateFlag),
    passwordField: !!isValid.passwordValidityFlag,
    passwordDoubleField: !!isValid.passwordDoubleValidityFlag,
  };

  const changeSignupValidityFlag = ({ key, value }: SignupInfoFlagTypes) => {
    setIsValid({
      ...isValid,
      [key]: value,
    });
  };

  const [totalRequiredInputFlag, setTotalRequiredInputFlag] = useState(false);

  useEffect(() => {
    const requiredInputCheck = Object.values(requiredSignupField).every(
      (flag) => flag === true
    );
    setTotalRequiredInputFlag(requiredInputCheck);
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
          emailValidityFlag={isValid.emailValidityFlag}
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
          idValidityFlag={isValid.idValidityFlag}
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
        <PasswordInput
          password={signupInfo.password}
          setPassword={(value) => changeSignupInfo({ key: "password", value })}
          passwordValidityFlag={isValid.passwordValidityFlag}
          setPasswordValidityFlag={(value) =>
            changeSignupValidityFlag({ key: "passwordValidityFlag", value })
          }
        />

        <PasswordConfirmationInput
          password={signupInfo.password}
          passwordDoubleValidityFlag={isValid.passwordDoubleValidityFlag}
          setPasswordDoubleValidityFlag={(value) =>
            changeSignupValidityFlag({
              key: "passwordDoubleValidityFlag",
              value,
            })
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
            disabled={!totalRequiredInputFlag}
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
