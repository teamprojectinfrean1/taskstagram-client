import { Box, Typography, OutlinedInput } from "@mui/material";
import { passwdDoubleCheck } from "@/utils/authCheck";

interface PropsType {
  passwd: string;
  passwdDouble: string;
  setPasswdDouble(passwdDouble: string): void;
  setPasswdDoubleFlag(passwdDoubleFlag: boolean): void;
}

const PasswdDoubleInput = (props: PropsType) => {
  return (
    <>
      <Typography sx={{ mt: 2.5, ml: 0.5 }}>Password check</Typography>
      <OutlinedInput
        type="password"
        fullWidth
        size="small"
        placeholder={"비밀번호 확인"}
        error={
          props.passwdDouble &&
          !passwdDoubleCheck({
            passwd: props.passwd,
            passwdDouble: props.passwdDouble,
          })
            ? true
            : false
        }
        onBlur={(e) => {
          props.setPasswdDouble(e.target.value);
          props.setPasswdDoubleFlag(
            passwdDoubleCheck({
              passwd: props.passwd,
              passwdDouble: e.target.value,
            })
          );
        }}
      />
      {props.passwdDouble &&
        !passwdDoubleCheck({
          passwd: props.passwd,
          passwdDouble: props.passwdDouble,
        }) && (
          <Box className="error-font">
            <Typography sx={{ fontWeight: "bold", fontSize: "11px" }}>
              비밀번호가 일치하지 않습니다.
            </Typography>
          </Box>
        )}
    </>
  );
};

export default PasswdDoubleInput;
