import theme from "@/theme/theme";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailInput from "./EmailInput";
import { Box, Button, Typography } from "@mui/material";

const FindPasswordForm = () => {
  const navigate = useNavigate();
  const [findPasswdEmail, setFindPasswdEmail] = useState("");
  const [findPasswdEmailFlag, setFindPasswdEmailFlag] = useState(false);

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography>비밀번호를 잃어버리셨나요?</Typography>
        <Typography>
          일정타그램에 가입한 이메일을 정확히 입력해 주세요.
        </Typography>
        <Typography>이메일을 통해 비밀번호 변경 링크가 전송됩니다.</Typography>
      </Box>
      <EmailInput
        email={findPasswdEmail}
        emailFlag={findPasswdEmailFlag}
        setEmail={setFindPasswdEmail}
        setEmailFlag={setFindPasswdEmailFlag}
      />
      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{
          mt: 3,
          bgcolor: `${theme.palette.secondary.main}`,
          borderRadius: "7px",
        }}
        disabled={!findPasswdEmailFlag}
        onClick={() => {
          navigate("/auth/find/password/success");
        }}
      >
        인증 메일 전송
      </Button>
    </>
  );
};

export default FindPasswordForm;
