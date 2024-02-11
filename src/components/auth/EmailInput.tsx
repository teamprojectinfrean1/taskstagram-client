import { Box, Typography, OutlinedInput } from "@mui/material";
import { checkAuthInputValidity } from "@/utils/authCheck";

type PropsType = {
  email: string;
  setEmail(email: string): void;
  setEmailFlag(emailFlag: boolean): void;
}

const EmailInput = ({ email, setEmail, setEmailFlag }: PropsType) => {
  return (
    <>
      <Typography sx={{ mt: 3, ml: 0.5 }}>Email</Typography>
      <OutlinedInput
        type="email"
        fullWidth
        size="small"
        placeholder={"example@email.com"}
        error={
          email && !checkAuthInputValidity({ type: "email", email })
            ? true
            : false
        }
        value={email}
        onBlur={(e) => {
          setEmail(e.target.value);
          setEmailFlag(
            checkAuthInputValidity({ type: "email", email: e.target.value })
          );
        }}
      />
      {email && !checkAuthInputValidity({ type: "email", email }) && (
        <Box className="error-font">
          <Typography sx={{ fontWeight: "bold", fontSize: "11px" }}>
            이메일 형식이 올바르지 않습니다.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default EmailInput;
