import theme from "@/theme/theme";
import { TextField } from "@mui/material";
import { checkAuthInputValidity } from "@/utils/authCheck";

type PasswordInputProps = {
  password: string;
  isPasswordValid: boolean;
  setPassword(password: string): void;
  setIsPasswordValid(passwordFlag: boolean): void;
};

const PasswordInput = ({
  password,
  setPassword,
  isPasswordValid,
  setIsPasswordValid,
}: PasswordInputProps) => {
  // 비밀번호 유효성 검사 상태
  const validState = !!(password && !isPasswordValid);

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
        placeholder={"비밀번호"}
        value={password}
        error={validState}
        helperText={
          validState &&
          "영문, 숫자, 특수문자 2가지 이상 포함. 8자 이상 32자 이하(공백 제외)"
        }
        onChange={(e) => {
          setPassword(e.target.value);
          setIsPasswordValid(
            checkAuthInputValidity({
              type: "password",
              authValue: e.target.value,
            })
          );
        }}
      />
    </>
  );
};

export default PasswordInput;
