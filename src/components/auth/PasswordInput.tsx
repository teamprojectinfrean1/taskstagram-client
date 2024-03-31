import theme from "@/theme/theme";
import { Typography, OutlinedInput } from "@mui/material";
import { checkAuthInputValidity } from "@/utils/authCheck";

type PasswordInputProps = {
  password: string;
  passwordValidityFlag: boolean;
  setPassword(password: string): void;
  setPasswordValidityFlag(passwordFlag: boolean): void;
};

const PasswordInput = ({
  password,
  setPassword,
  passwordValidityFlag,
  setPasswordValidityFlag,
}: PasswordInputProps) => {
  const passwordFlagState = !!(password && !passwordValidityFlag);

  return (
    <>
      <OutlinedInput
        sx={{mt:3}}
        type="password"
        fullWidth
        size="small"
        placeholder={"비밀번호"}
        value={password}
        error={passwordFlagState}
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordValidityFlag(
            checkAuthInputValidity({
              type: "password",
              authValue: e.target.value,
            })
          );
        }}
      />
      {passwordFlagState && (
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
          영문, 숫자, 특수문자 2가지 이상 포함. 8자 이상 32자 이하(공백 제외)
        </Typography>
      )}
    </>
  );
};

export default PasswordInput;
