import { Box, Typography, OutlinedInput } from "@mui/material";
import { effectCheck } from "@/utils/authCheck";

interface PropsType {
  passwd: string;
  setPasswd(passwd: string): void;
  setPasswdFlag(passwdFlag: boolean): void;
}

const PasswdInput = (props: PropsType) => {
  return (
    <>
      <Typography sx={{ mt: 2.5, ml: 0.5 }}>Password</Typography>
      <OutlinedInput
        type="password"
        fullWidth
        size="small"
        placeholder={"비밀번호"}
        error={
          props.passwd && !effectCheck({ type: "passwd", passwd: props.passwd })
            ? true
            : false
        }
        onBlur={(e) => {
          props.setPasswd(e.target.value);
          props.setPasswdFlag(
            effectCheck({ type: "passwd", passwd: e.target.value })
          );
        }}
      />
      {props.passwd &&
        !effectCheck({ type: "passwd", passwd: props.passwd }) && (
          <Box className="error-font">
            <Typography sx={{ fontWeight: "bold", fontSize: "11px" }}>
              영문, 숫자, 특수문자 2가지 이상 포함. 8자 이상 32자 이하(공백
              제외)
            </Typography>
          </Box>
        )}
    </>
  );
};

export default PasswdInput;
