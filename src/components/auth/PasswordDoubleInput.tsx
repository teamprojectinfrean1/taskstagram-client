import theme from "@/theme/theme";
import { Typography, OutlinedInput } from "@mui/material";
import { passwordDoubleCheck } from "@/utils/authCheck";
import { useState } from "react";

type PasswordDoubleInputProps = {
  password: string;
  passwordDoubleValidityFlag: boolean;
  setPasswordDoubleValidityFlag(passwordDoubleFlag: boolean): void;
};

const PasswordDoubleInput = ({
  password,
  passwordDoubleValidityFlag,
  setPasswordDoubleValidityFlag,
}: PasswordDoubleInputProps) => {

  const [passwordDouble, setPasswordDouble] = useState("")
  const passwordDoubleFlagState = !!(passwordDouble && !passwordDoubleValidityFlag);

  return (
    <>
      <OutlinedInput
        sx={{mt:3}}
        type="password"
        fullWidth
        size="small"
        placeholder={"비밀번호 확인"}
        error={passwordDoubleFlagState}
        value={passwordDouble}
        onChange={(e) => {
          setPasswordDouble(e.target.value);
          setPasswordDoubleValidityFlag(
            passwordDoubleCheck({
              password,
              passwordDouble: e.target.value,
            })
          );
        }}
      />
      {passwordDoubleFlagState && (
        <Typography
          sx={{
            position: "absolute",
            mt: 0.1,
            ml: 1,
            fontWeight: "bold",
            fontSize: "11px",
            color: theme.palette.error.main,
          }}
        >
          비밀번호가 일치하지 않습니다.
        </Typography>
      )}
    </>
  );
};

export default PasswordDoubleInput;
