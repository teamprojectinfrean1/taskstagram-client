import theme from "@/theme/theme";
import { Box, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const ChangeUserInfoSuccess = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const changeUserInfo = location.state

  return (
    <Box
      boxShadow={10}
      sx={{
        height: "90%",
        backgroundColor: 'white',
        minWidth: "37rem",
        borderRadius: "7px",
      }}
    >
      <Box sx={{ mt: 10 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {changeUserInfo} 변경
        </Typography>
      </Box>
      <Box
        className="base-layout"
        sx={{
          border: '1px solid #F0F0F0',
          height: "50%",
          borderRadius: "7px",
          mt: 6,
        }}
      >
        <Box sx={{ width: "90%", margin: "auto" }}>
          <Box sx={{ my: 8, textAlign: "center" }}>
            <Typography variant="h6">
              {changeUserInfo === "비밀번호"? `${changeUserInfo}가`: `${changeUserInfo}이`} 성공적으로 변경되었습니다.
            </Typography>
            <Typography variant="h6">
              확인 버튼을 클릭하면 My Page로 돌아갑니다.
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              bgcolor: `${theme.palette.secondary.main}`,
              borderRadius: "7px",
            }}
            onClick={() => {
              navigate("/mypage")
            }}
          >
            확인
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangeUserInfoSuccess;
