import theme from "@/theme/theme";
import { TextField } from "@mui/material";
import { passwordDoubleCheck } from "@/utils/authCheck";
import { useState } from "react";

type PasswordDoubleInputProps = {
  password: string;
  isPasswordConfirmValid: boolean;
  setIsPasswordConfirmValid(passwordDoubleFlag: boolean): void;
};

const PasswordConfirmationInput = ({
  password,
  isPasswordConfirmValid,
  setIsPasswordConfirmValid,
}: PasswordDoubleInputProps) => {
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const arePasswordsInSync = !!(passwordConfirm && !isPasswordConfirmValid);

  return (
    <TextField
      sx={{
        "& .MuiFormHelperText-root": {
          position: "absolute",
          mt: 5,
          ml: 1,
          fontSize: "11px",
          fontWeight: "bold",
          color: theme.palette.error.main,
        },
      }}
      type="password"
      fullWidth
      size="small"
      placeholder={"비밀번호 확인"}
      error={arePasswordsInSync}
      helperText={arePasswordsInSync && "비밀번호가 일치하지 않습니다."}
      value={passwordConfirm}
      onChange={(e) => {
        setPasswordConfirm(e.target.value);
        setIsPasswordConfirmValid(
          passwordDoubleCheck({
            password,
            passwordDouble: e.target.value,
          })
        );
      }}
    />
  );
};

export default PasswordConfirmationInput;
