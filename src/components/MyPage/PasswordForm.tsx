import { userInfoState } from "@/stores/userStore";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const PasswordForm = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);
  const loginType = userInfo.weaver;

  return (
    <Box
      sx={{
        border: "1px solid #626262",
        mt: 3,
        py: 2,
        borderRadius: "7px",
      }}
    >
      <Box sx={{ width: "90%", mx: "auto" }}>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              비밀번호 변경
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Button
              sx={{
                display: loginType ? "" : "none",
                fontSize: "7px",
                backgroundColor: "#F0EFFA",
                borderRadius: "20px",
              }}
              onClick={() => {
                navigate("/mypage/change/password");
              }}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ mt: 1, color: "#626262" }}>
          {loginType
            ? "비밀번호를 변경하려면 인증이 필요합니다."
            : "카카오 로그인 상태는 비밀번호를 변경하실 수 없습니다."}
        </Typography>
      </Box>
    </Box>
  );
};

export default PasswordForm;
