import { userInfoState } from "@/stores/userStore";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import theme from "@/theme/theme";

const UserInfoForm = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);
  const loginType = userInfo.weaver;

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.text.primary}`,
        mt: 3,
        py: 2,
        borderRadius: "7px",
      }}
    >
      <Box sx={{ width: "90%", mx: "auto" }}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={2}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              닉네임
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              variant="body2"
              sx={{
                color: `${theme.palette.text.primary}`,
                fontWeight: "bold",
              }}
            >
              {userInfo.nickname}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Button
              sx={{
                fontSize: "7px",
                backgroundColor: "#F0EFFA",
                borderRadius: "20px",
              }}
              onClick={() => {
                navigate("/mypage/change/nickname");
              }}
            >
              Edit
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ mt: 2, alignItems: "center" }}>
          <Grid item xs={2}>
            <Typography variant="body2" fontWeight="bold">
              이메일
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              variant="body2"
              sx={{
                color: `${theme.palette.text.primary}`,
                fontWeight: "bold",
              }}
            >
              {loginType
                ? userInfo.email
                : "카카오 로그인 상태는 이메일이 없습니다."}
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
                navigate("/mypage/change/email");
              }}
            >
              Edit
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ mt: 2, alignItems: "center" }}>
          <Grid item xs={2}>
            <Typography variant="body2" fontWeight="bold">
              아이디
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ color: `${theme.palette.text.primary}` }}
            >
              {loginType
                ? userInfo.id
                : "카카오 로그인 상태는 아이디가 없습니다."}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserInfoForm;
