import theme from "@/theme/theme";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { AuthInputValue } from "@/models/Auth";
import PasswordInput from "./PasswordInput";
import PasswordConfirmationInput from "./PasswordConfirmationInput";
import { useMutation } from "react-query";
import { AuthisValid } from "@/models/Auth";
import { resetPassword } from "@/apis/user/resetPassword";
import { resetPasswordRequest } from "@/apis/user/resetPassword";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const memberId = location.state.memberId;

  const [passwordInfo, setPasswordInfo] = useState({
    password: "",
  });

  const [isValid, setIsValid] = useState({
    isPasswordValid: false,
    isPasswordConfirmValid: false,
  });

  const changePasswordInfo = ({ key, value }: AuthInputValue) => {
    setPasswordInfo({
      ...passwordInfo,
      [key]: value,
    });
  };

  const changeIsPasswordValid = ({ key, value }: AuthisValid) => {
    setIsValid({
      ...isValid,
      [key]: value,
    });
  };

  const resetPasswordMutation = useMutation(
    ({ memberId, password }: resetPasswordRequest) =>
      resetPassword({ memberId, password }),
    {
      onSuccess: (data) => {
        console.log(data);
        if (data) {
          navigate("/auth/find/password/success");
        }
      },
    }
  );

  const [isPasswordRequiredInput, setIsPasswordRequiredInput] = useState(false);
  useEffect(() => {
    const requiredInputCheck = Object.values(isValid).every(
      (flag) => flag === true
    );
    setIsPasswordRequiredInput(requiredInputCheck);
  }, [isValid]);

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ my: 4 }}>
          사용하실 비밀번호를 입력해주세요.
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography>신규 비밀번호</Typography>
        <PasswordInput
          password={passwordInfo.password}
          setPassword={(value) =>
            changePasswordInfo({ key: "password", value })
          }
          isPasswordValid={isValid.isPasswordValid}
          setIsPasswordValid={(value) => {
            changeIsPasswordValid({ key: "isPasswordValid", value });
          }}
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography>신규 비밀번호 확인</Typography>
        <PasswordConfirmationInput
          password={passwordInfo.password}
          isPasswordConfirmValid={isValid.isPasswordConfirmValid}
          setIsPasswordConfirmValid={(value) => {
            changeIsPasswordValid({ key: "isPasswordConfirmValid", value });
          }}
        />
      </Box>

      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{
          mt: 5,
          bgcolor: `${theme.palette.secondary.main}`,
          borderRadius: "7px",
        }}
        disabled={!isPasswordRequiredInput}
        onClick={() => {
          resetPasswordMutation.mutate({
            memberId,
            password: passwordInfo.password,
          });
        }}
      >
        변경
      </Button>
    </>
  );
};

export default ResetPasswordForm;
