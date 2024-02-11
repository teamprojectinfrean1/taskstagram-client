import { Box, Typography, OutlinedInput } from "@mui/material";
import { checkAuthInputValidity } from "@/utils/authCheck";

type PropsType = {
  passwd: string;
  setPasswd(passwd: string): void;
  setPasswdFlag(passwdFlag: boolean): void;
}

const PasswdInput = ({ passwd, setPasswd, setPasswdFlag }: PropsType) => {
  return (
    <>
      <Typography sx={{ mt: 2.5, ml: 0.5 }}>Password</Typography>
      <OutlinedInput
        type="password"
        fullWidth
        size="small"
        placeholder={"비밀번호"}
        value={passwd}
        error={
          passwd && !checkAuthInputValidity({ type: "passwd", passwd })
            ? true
            : false
        }
        onBlur={(e) => {
          setPasswd(e.target.value);
          setPasswdFlag(
            checkAuthInputValidity({ type: "passwd", passwd: e.target.value })
          );
        }}
      />
      {passwd && !checkAuthInputValidity({ type: "passwd", passwd }) && (
        <Box className="error-font">
          <Typography sx={{ fontWeight: "bold", fontSize: "11px" }}>
            영문, 숫자, 특수문자 2가지 이상 포함. 8자 이상 32자 이하(공백 제외)
          </Typography>
        </Box>
      )}
    </>
  );
};

export default PasswdInput;
