import theme from "@/theme/theme";
import { Typography, OutlinedInput } from "@mui/material";
import { checkAuthInputValidity } from "@/utils/authCheck";

type PropsType = {
  passwd: string;
  passwdFlag: boolean;
  setPasswd(passwd: string): void;
  setPasswdFlag(passwdFlag: boolean): void;
};

const PasswdInput = ({
  passwd,
  passwdFlag,
  setPasswd,
  setPasswdFlag,
}: PropsType) => {
  return (
    <>
      <Typography sx={{ mt: 2.5, ml: 0.5 }}>Password</Typography>
      <OutlinedInput
        type="password"
        fullWidth
        size="small"
        placeholder={"비밀번호"}
        value={passwd}
        error={passwd && !passwdFlag ? true : false}
        onChange={(e) => {
          setPasswd(e.target.value);
          setPasswdFlag(
            checkAuthInputValidity({ type: "passwd", authValue: e.target.value })
          );
        }}
      />
      {passwd && !passwdFlag && (
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
