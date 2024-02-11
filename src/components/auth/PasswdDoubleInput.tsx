import { Box, Typography, OutlinedInput } from "@mui/material";
import { passwdDoubleCheck } from "@/utils/authCheck";

type PropsType = {
  passwd: string;
  passwdDouble: string;
  setPasswdDouble(passwdDouble: string): void;
  setPasswdDoubleFlag(passwdDoubleFlag: boolean): void;
}

const PasswdDoubleInput = ({
  passwd,
  passwdDouble,
  setPasswdDouble,
  setPasswdDoubleFlag,
}: PropsType) => {
  return (
    <>
      <Typography sx={{ mt: 2.5, ml: 0.5 }}>Password check</Typography>
      <OutlinedInput
        type="password"
        fullWidth
        size="small"
        placeholder={"비밀번호 확인"}
        error={
          passwdDouble &&
          !passwdDoubleCheck({
            passwd,
            passwdDouble,
          })
            ? true
            : false
        }
        value={passwdDouble}
        onBlur={(e) => {
          setPasswdDouble(e.target.value);
          setPasswdDoubleFlag(
            passwdDoubleCheck({
              passwd,
              passwdDouble: e.target.value,
            })
          );
        }}
      />
      {passwdDouble &&
        !passwdDoubleCheck({
          passwd,
          passwdDouble,
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
