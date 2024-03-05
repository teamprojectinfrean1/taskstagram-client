import theme from "@/theme/theme";
import { Typography, OutlinedInput } from "@mui/material";
import { passwdDoubleCheck } from "@/utils/authCheck";
import { useState } from "react";

type PasswdDoubleInputProps = {
  passwd: string;
  // passwdDouble: string;
  // setPasswdDouble(passwdDouble: string): void;
  passwdDoubleValidityFlag: boolean;
  setPasswdDoubleValidityFlag(passwdDoubleFlag: boolean): void;
};

const PasswdDoubleInput = ({
  passwd,
  // passwdDouble,
  // setPasswdDouble,
  passwdDoubleValidityFlag,
  setPasswdDoubleValidityFlag,
}: PasswdDoubleInputProps) => {

  const [passwdDouble, setPasswdDouble] = useState("")
  const passwdDoubleFlagState = !!(passwdDouble && !passwdDoubleValidityFlag);

  return (
    <>
      <OutlinedInput
        sx={{mt:3}}
        type="password"
        fullWidth
        size="small"
        placeholder={"비밀번호 확인"}
        error={passwdDoubleFlagState}
        value={passwdDouble}
        onChange={(e) => {
          setPasswdDouble(e.target.value);
          setPasswdDoubleValidityFlag(
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
