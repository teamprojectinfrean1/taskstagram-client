import theme from "@/theme/theme";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { SignupInputValue } from "@/models/Auth";
import PasswordInput from "./PasswordInput";
import PasswordConfirmationInput from "./PasswordConfirmationInput";
import { useMutation, useQuery } from "react-query";
import { resetPassword } from "@/apis/auth";

type PasswordInfoFlagTypes = {
  key: string;
  value: boolean;
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state.userId

  const [passwordInfo, setPasswordInfo] = useState({
    password: "",
    passwordDouble: ""
  })

  const [passwordValidityFlag, setPasswordValidityFlag] = useState({
    isPasswordValidity: false,
    ispasswordDoubleValidity: false
  }) 

  const changePasswordInfo = ({key, value}: SignupInputValue) => {
    setPasswordInfo({
      ...passwordInfo,
      [key]: value
    })
  }

  const changePasswordValidityFlag = ({ key, value }: PasswordInfoFlagTypes) => {
    setPasswordValidityFlag({
      ...passwordValidityFlag,
      [key]: value,
    });
  };

  const resetPasswordMutation = useMutation(({userId, password}: any) => resetPassword({userId, password}), {
    onSuccess: (data) => {
      console.log(data)
      if (data) {
        navigate('/auth/find/password/success')
      }
    }
  })

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ my: 3 }}>
          사용하실 비밀번호를 입력해주세요.
        </Typography>
      </Box>

      <PasswordInput 
      password={passwordInfo.password}
      setPassword={(value: string) => changePasswordInfo({key: "password", value})}
      passwordValidityFlag = {passwordValidityFlag.isPasswordValidity}
      setPasswordValidityFlag={(value) => {
        changePasswordValidityFlag({key: "isPasswordValidity", value})
      }}
      />
      <PasswordConfirmationInput 
        password = {passwordInfo.password}
        passwordDoubleValidityFlag = {passwordValidityFlag.ispasswordDoubleValidity}
        setPasswordDoubleValidityFlag={(value) => {
          changePasswordValidityFlag({key: "ispasswordDoubleValidity", value})
        }}
      />

      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{
          mt: 5,
          bgcolor: `${theme.palette.secondary.main}`,
          borderRadius: "7px",
        }}
        onClick={() => {
          resetPasswordMutation.mutate({userId, password: passwordInfo.password})
        }}
      >
        변경
      </Button>
    </>
  );
};

export default ResetPassword;
