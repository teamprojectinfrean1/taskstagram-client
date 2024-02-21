import theme from "@/theme/theme";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FindEmailSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography>인증한 휴대폰 번호로 가입한 계정입니다.</Typography>
      </Box>

      <Box
        sx={{
          mt: 7,
          border: "1.5px solid #5D5D5D",
          borderRadius: "12px",
          height: "100px",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography sx={{ fontWeight: "bold" }}>홍길동</Typography>
          <Typography>tasdfsdfsdf@email.com</Typography>
        </Box>
      </Box>
      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{
          mt: 3,
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

export default FindEmailSuccess;
