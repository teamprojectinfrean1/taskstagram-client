import "./Auth.css";
import { Link } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Divider, Button, OutlinedInput, Typography } from "@mui/material";

const FindPasswordForm = () => {
  return (
    <>
      <Link to="/auth">
        <ArrowBackIcon fontSize="large" sx={{ m: 3, color: "#5F6368" }} />
      </Link>
      <Box className="base-layout">
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            비밀번호 재설정
          </Typography>
          <Divider sx={{ mt: 4, mb: 3 }} />
          <Typography>비밀번호를 잃어버리셨나요?</Typography>
          <Typography>
            일정타그램에 가입한 이메일을 정확히 입력해 주세요.
          </Typography>
          <Typography>
            이메일을 통해 비밀번호 변경 링크가 전송됩니다.
          </Typography>
        </Box>
        <Typography sx={{ mt: 5, ml: 0.5 }}>Email</Typography>
        <OutlinedInput
          fullWidth
          size="small"
          placeholder={"example@email.com"}
          sx={{ mt: 1 }}
        />
        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, width: "100%", bgcolor: "#B2B4B8", borderRadius: "8px" }}
        >
          인증 메일 전송
        </Button>
      </Box>
    </>
  );
};

export default FindPasswordForm;
