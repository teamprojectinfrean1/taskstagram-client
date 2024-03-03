import theme from "@/theme/theme";
import { Typography, OutlinedInput } from "@mui/material";
import { checkAuthInputValidity } from "@/utils/authCheck";

type PasswdInputProps = {
  passwd: string;
  passwdValidityFlag: boolean;
  setPasswd(passwd: string): void;
  setPasswdValidityFlag(passwdFlag: boolean): void;
};

const PasswdInput = ({
  passwd,
  setPasswd,
  passwdValidityFlag,
  setPasswdValidityFlag,
}: PasswdInputProps) => {
  const passwdFlagState = !!(passwd && !passwdValidityFlag);

  return (
    <>
      <OutlinedInput
        sx={{mt:3}}
        type="password"
        fullWidth
        size="small"
        placeholder={"비밀번호"}
        value={passwd}
        error={passwdFlagState}
        onChange={(e) => {
          setPasswd(e.target.value);
          setPasswdValidityFlag(
            checkAuthInputValidity({
              type: "passwd",
              authValue: e.target.value,
            })
          );
        }}
      />
      {passwdFlagState && (
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

export default PasswdInput;
