import "../Auth.css";
import { Link } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Divider, Button, OutlinedInput } from "@mui/material";

const FindPasswordForm = () => {
  return (
    <>
      <Link to="/login">
        <ArrowBackIcon fontSize="large" sx={{m:3, color:'#5F6368'}} />
      </Link>
      <div className="base-layout">
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <h2>비밀번호 재설정</h2>
          <Divider sx={{mt:4, mb:3}} />
          <p>비밀번호를 잃어버리셨나요?</p>
          <p>일정타그램에 가입한 이메일을 정확히 입력해 주세요.</p>
          <p>이메일을 통해 비밀번호 변경 링크가 전송됩니다.</p>
        </div>
        <p style={{ marginTop: 40, marginLeft: 3 }}>Email</p>
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
      </div>
    </>
  );
};

export default FindPasswordForm;
