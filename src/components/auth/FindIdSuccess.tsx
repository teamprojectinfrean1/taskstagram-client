import theme from "@/theme/theme";
import { Box, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FindEmailSuccess = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const id = location.state?.id;

  useEffect(() => {
    console.log(id);
    if (!id) {
      navigate("/auth/login")
    }
  }, [])

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography>인증한 이메일로 가입한 아이디입니다.</Typography>
      </Box>
      <Box
        sx={{
          mt: 7,
          border: "1.5px solid #5D5D5D",
          borderRadius: "12px",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography sx={{ fontWeight: "bold" }}>아이디: {id}</Typography>
        </Box>
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

export default FindEmailSuccess;
