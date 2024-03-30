import theme from "@/theme/theme";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { SignupInputValue } from "@/models/Auth";
import PasswordInput from "./PasswordInput";
import PasswordConfirmationInput from "./PasswordConfirmationInput";

type PasswordInfoFlagTypes = {
  key: string;
  value: boolean;
};

const ResetPassword = () => {
  const navigate = useNavigate();

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
      setPasswordValidityFlag={(value: boolean) => {
        changePasswordValidityFlag({key: "passwordValidityFlag", value})
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
          navigate("/auth/login");
        }}
      >
        확인
      </Button>
    </>
  );
};

export default ResetPassword;
