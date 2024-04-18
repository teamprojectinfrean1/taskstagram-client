import { userInfoState } from "@/stores/userStore";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import theme from "@/theme/theme";

const UserInfoForm = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  console.log(userInfo);

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
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              닉네임
            </Typography>
          </Grid>
          <Grid item xs={7}>
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

        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={3}>
            <Typography variant="body2" fontWeight="bold">
              이메일
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography
              variant="body2"
              sx={{
                color: `${theme.palette.text.primary}`,
                fontWeight: "bold",
              }}
            >
              {userInfo.email}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Button
              sx={{
                fontSize: "7px",
                backgroundColor: "#F0EFFA",
                borderRadius: "20px",
              }}
            >
              Edit
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={3}>
            <Typography variant="body2" fontWeight="bold">
              아이디
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ color: `${theme.palette.text.primary}` }}
            >
              {userInfo.id}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserInfoForm;
