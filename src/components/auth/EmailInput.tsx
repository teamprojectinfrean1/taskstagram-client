import theme from "@/theme/theme";
import { checkAuthInputValidity } from "@/utils/authCheck";
import { Typography, OutlinedInput } from "@mui/material";

type PropsType = {
  email: string;
  emailFlag: boolean;
  setEmail(email: string): void;
  setEmailFlag(emailFlag: boolean): void;
};

const EmailInput = ({
  email,
  emailFlag,
  setEmail,
  setEmailFlag,
}: PropsType) => {
  const emailFlagState = !!(email && !emailFlag);

  return (
    <>
      <Typography sx={{ mt: 3, ml: 0.5 }}>Email</Typography>
      <OutlinedInput
        type="email"
        fullWidth
        size="small"
        placeholder={"example@email.com"}
        error={emailFlagState}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailFlag(
            checkAuthInputValidity({ type: "email", authValue: e.target.value })
          );
        }}
      />
      {emailFlagState && (
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
          이메일 형식이 올바르지 않습니다.
        </Typography>
      )}
    </>
  );
};

export default EmailInput;
