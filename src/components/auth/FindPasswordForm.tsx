import { Box, Typography } from "@mui/material";
import EmailCertificationInput from "./EmailCertificationInput";

const FindPasswordForm = () => {

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography>비밀번호를 잃어버리셨나요?</Typography>
        <Typography>
          일정타그램에 가입한 이메일을 정확히 입력해 주세요.
        </Typography>
        <Typography>이메일을 통해 비밀번호 변경 링크가 전송됩니다.</Typography>
      </Box>
      <EmailCertificationInput findUserInfo = "findPassword" />
    </>
  );
};

export default FindPasswordForm;
