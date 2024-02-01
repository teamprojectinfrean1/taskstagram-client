import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignupSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="base-layout text-center">
        <h2 style={{ marginTop: 100 }}>Welcome to</h2>
        <h2>
          <span style={{ color: "#2388B3" }}>Task</span>tagram!
        </h2>
        <p style={{ margin: 40 }}>홍길동님, 가입이 완료되었습니다.</p>
        <p>확인 버튼을 누르면</p>
        <p>로그인 화면으로 이동합니다.</p>
        <Button
          variant="contained"
          size="medium"
          fullWidth
          sx={{ mt: 8, bgcolor: "#1B698A" }}
          onClick={() => {
            navigate('/login')
          }}
        >
          확인
        </Button>
      </div>
    </>
  );
};

export default SignupSuccess;
