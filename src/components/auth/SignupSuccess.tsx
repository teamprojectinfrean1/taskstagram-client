import theme from "@/theme/theme";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useChangeSignupInfo } from "@/hooks/useChangeSignupInfo";

const SignupSuccess = () => {
  const navigate = useNavigate();
  const id = useLocation().state;

  const { resetSignupInfo } = useChangeSignupInfo();

  return (
    <Box className="base-layout text-center">
      <Typography variant="h3" sx={{ fontFamily: "Pattaya", mt: 12 }}>
        Welcome to
      </Typography>
      <Typography variant="h3" sx={{ fontFamily: "Pattaya", color: "#2388B3" }}>
        Task
        <Typography
          variant="h3"
          sx={{ fontFamily: "Pattaya", display: "inline", color: "black" }}
        >
          tagram!
        </Typography>
      </Typography>
      <Box sx={{ my: 5 }}>
        <Typography>{id}님, 가입이 완료되었습니다.</Typography>
      </Box>
      <Typography>확인 버튼을 누르면</Typography>
      <Typography>로그인 화면으로 이동합니다.</Typography>
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{
          mt: 6,
          bgcolor: `${theme.palette.secondary.main}`,
          borderRadius: "7px",
        }}
        onClick={() => {
          resetSignupInfo();
          navigate("/auth/login");
        }}
      >
        확인
      </Button>
    </Box>
  );
};

export default SignupSuccess;
