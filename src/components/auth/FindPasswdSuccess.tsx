import theme from "@/theme/theme";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const FindPasswdSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ mt: 5, mb: 3 }}>
          비밀번호 재설정이 완료되었습니다.
        </Typography>
        <Typography>로그인 화면으로 이동합니다.</Typography>
        <Typography>확인 버튼을 누르면</Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{
          mt: 5,
          bgcolor: `${theme.palette.secondary.main}`,
          borderRadius: "7px",
        }}
        onClick={() => {
          navigate("/auth/login");
        }}
      >
        확인
      </Button>
    </>
  );
};

export default FindPasswdSuccess;
