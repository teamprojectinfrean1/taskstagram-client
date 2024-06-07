import theme from "@/theme/theme";
import { Box, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FindPasswordSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resetPasswordSuccess = location.state
    
  useEffect(() => {
    if (!resetPasswordSuccess) {
      navigate("/auth/login")
    }
  }, [])

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ my: 3 }}>
          비밀번호 재설정이 완료되었습니다.
        </Typography>
        <Typography>확인 버튼을 누르면</Typography>
        <Typography>로그인 화면으로 이동합니다.</Typography>
      </Box>
      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{
          mt: 7,
          bgcolor: `${theme.palette.secondary.main}`,
          borderRadius: "7px",
        }}
        onClick={() => {
          navigate("/auth/login");
        }}
      >
        로그인
      </Button>
    </>
  );
};

export default FindPasswordSuccess;
