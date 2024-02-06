import { Box, Typography, OutlinedInput } from "@mui/material";
import { effectCheck } from "@/utils/authCheck";

interface PropsType {
  email: string;
  setEmail(email: string): void;
  setEmailFlag(emailFlag: boolean): void;
}

const EmailInput = (props: PropsType) => {
  return (
    <>
      <Typography sx={{ mt: 3, ml: 0.5 }}>Email</Typography>
      <OutlinedInput
        type="email"
        fullWidth
        size="small"
        placeholder={"example@email.com"}
        error={props.email && !effectCheck({type: "email", email: props.email}) ? true : false}
        onBlur={(e) => {
          props.setEmail(e.target.value);
          props.setEmailFlag(effectCheck({type: "email", email: e.target.value}));
        }}
      />
      {props.email && !effectCheck({type: "email", email: props.email}) && (
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
