import theme from "@/theme/theme";
import { Typography, OutlinedInput } from "@mui/material";
import { passwdDoubleCheck } from "@/utils/authCheck";

type PasswdDoubleInputProps = {
  passwd: string;
  passwdDouble: string;
  passwdDoubleFlag: boolean;
  setPasswdDouble(passwdDouble: string): void;
  setPasswdDoubleFlag(passwdDoubleFlag: boolean): void;
};

const PasswdDoubleInput = ({
  passwd,
  passwdDouble,
  passwdDoubleFlag,
  setPasswdDouble,
  setPasswdDoubleFlag,
}: PasswdDoubleInputProps) => {
  const passwdDoubleFlagState = !!(passwdDouble && !passwdDoubleFlag);

  return (
    <>
      <Typography sx={{ mt: 2.5, ml: 0.5 }}>Password check</Typography>
      <OutlinedInput
        type="password"
        fullWidth
        size="small"
        placeholder={"비밀번호 확인"}
        error={passwdDoubleFlagState}
        value={passwdDouble}
        onChange={(e) => {
          setPasswdDouble(e.target.value);
          setPasswdDoubleFlag(
            passwdDoubleCheck({
              passwd,
              passwdDouble: e.target.value,
            })
          );
        }}
      />
      {passwdDoubleFlagState && (
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
          비밀번호가 일치하지 않습니다.
        </Typography>
      )}
    </>
  );
};

export default PasswdDoubleInput;
