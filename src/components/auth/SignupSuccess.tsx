import { Button, Box, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const SignupSuccess = () => {
  const navigate = useNavigate();
  const { email } = useLocation().state;

  return (
    <Box className="base-layout text-center">
      <Typography variant="h5" sx={{ fontWeight: "bold", mt: 12 }}>
        Welcome to
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#2388B3" }}>
        Task
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", display: "inline", color: "black" }}
        >
          tagram!
        </Typography>
      </Typography>
      <Box sx={{ my: 5 }}>
        <Typography>{email}님, 가입이 완료되었습니다.</Typography>
      </Box>
      <Typography>확인 버튼을 누르면</Typography>
      <Typography>로그인 화면으로 이동합니다.</Typography>
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 7, bgcolor: "#1B698A" }}
        onClick={() => {
          navigate("/login");
        }}
      >
        확인
      </Button>
    </Box>
  );
};

export default SignupSuccess;
