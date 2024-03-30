import theme from "@/theme/theme";
import { TextField } from "@mui/material";
import { passwordDoubleCheck } from "@/utils/authCheck";
import { useState } from "react";

type PasswordDoubleInputProps = {
  password: string;
  passwordDoubleValidityFlag: boolean;
  setPasswordDoubleValidityFlag(passwordDoubleFlag: boolean): void;
};

const PasswordConfirmationInput = ({
  password,
  passwordDoubleValidityFlag,
  setPasswordDoubleValidityFlag,
}: PasswordDoubleInputProps) => {
  const [passwordDouble, setPasswordDouble] = useState("");
  const arePasswordsInSync = !!(
    passwordDouble && !passwordDoubleValidityFlag
  );

  return (
    <>
      <TextField
        sx={{
          mt: 3,
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
    </>
  );
};

export default PasswordConfirmationInput;
