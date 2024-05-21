import theme from "@/theme/theme";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IdInput from "./IdInput";
import { useRecoilValue } from "recoil";
import { signupInfoState } from "@/stores/AuthStore";
import { useChangeSignupInfo } from "@/hooks/useChangeSignupInfo";
import PasswordConfirmationInput from "./PasswordConfirmationInput";

const SignupFormRequired = () => {
  const { changeSignupInfo, resetSignupInfo } = useChangeSignupInfo();

  const navigate = useNavigate();

  const signupInfo = useRecoilValue(signupInfoState);

  // 회원가입 필수 input(이메일, 아이디, 비밀번호) 유효성 확인 변수
  const [isValid, setIsValid] = useState({
    isEmailValid: false,
    isIdValid: false,
    isPasswordValid: false,
    isPasswordConfirmValid: false,
  });

  // 회원가입 필수 input 중복 확인 변수
  const [isDuplicate, setIsDuplicate] = useState({
    isEmailDuplicate: false,
    isIdDuplicate: false,
  });

  // 회원가입 필수 input 작성 확인 변수
  const requiredField = {
    emailField: !!(isValid.isEmailValid && isDuplicate.isEmailDuplicate),
    idField: !!(isValid.isIdValid && isDuplicate.isIdDuplicate),
    passwordField: !!isValid.isPasswordValid,
    passwordConfirmField: !!isValid.isPasswordConfirmValid,
  };

  const changeIsValid = ({ key, value }: AuthisValid) => {
    setIsValid({
      ...isValid,
      [key]: value,
    });
  };

  // 회원가입 필수 input 체크 변수
  const [isTotalRequiredInput, setIsTotalRequiredInput] = useState(false);

  useEffect(() => {
    const requiredInputCheck = Object.values(requiredField).every(
      (flag) => flag === true
    );
    setIsTotalRequiredInput(requiredInputCheck);
  }, [requiredField]);

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
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            회원가입
          </Typography>
        </Box>
        <EmailInput
          email={signupInfo.email}
          setEmail={(value) => changeSignupInfo({ key: "email", value })}
          isEmailValid={isValid.isEmailValid}
          setIsEmailValid={(value) =>
            changeIsValid({ key: "isEmailValid", value })
          }
          isEmailDuplicate={isDuplicate.isEmailDuplicate}
          setIsEmailDuplicate={(value) =>
            setIsDuplicate({
              ...isDuplicate,
              isEmailDuplicate: value,
            })
          }
        />
        <IdInput
          id={signupInfo.id}
          setId={(value) => changeSignupInfo({ key: "id", value })}
          isIdValid={isValid.isIdValid}
          setIsIdValid={(value) => {
            changeIsValid({ key: "isIdValid", value });
          }}
          isIdDuplicate={isDuplicate.isIdDuplicate}
          setIsIdDuplicate={(value) => {
            setIsDuplicate({
              ...isDuplicate,
              isIdDuplicate: value,
            });
          }}
        />
        <Box sx={{ mt: 3 }}>
          <PasswordInput
            password={signupInfo.password}
            setPassword={(value) =>
              changeSignupInfo({ key: "password", value })
            }
            isPasswordValid={isValid.isPasswordValid}
            setIsPasswordValid={(value) =>
              changeIsValid({ key: "isPasswordValid", value })
            }
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <PasswordConfirmationInput
            password={signupInfo.password}
            isPasswordConfirmValid={isValid.isPasswordConfirmValid}
            setIsPasswordConfirmValid={(value) =>
              changeIsValid({
                key: "isPasswordConfirmValid",
                value,
              })
            }
          />
        </Box>
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              bgcolor: `${theme.palette.secondary.main}`,
              borderRadius: "7px",
            }}
            disabled={!isTotalRequiredInput}
            onClick={() => {
              navigate("/auth/signup/optional");
            }}
          >
            계속
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SignupFormRequired;
