import { Box, Grid, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const PasswordForm = () => {
  const navigate = useNavigate()

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
          <Typography variant="body1" sx={{fontWeight:'bold'}}>비밀번호 변경</Typography>
        </Grid>
        <Grid
          item
          xs={2}
          // sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            sx={{
              fontSize: "7px",
              backgroundColor: "#F0EFFA",
              borderRadius: "20px",
            }}
            onClick={() => {
              navigate("/mypage/change/password")
            }}
          >
            Edit
          </Button>
        </Grid>
      </Grid>
      <Typography variant="body2" sx={{ mt: 1, color: "#626262" }}>
        비밀번호를 변경하려면 인증이 필요합니다.
      </Typography>
    </Box>
  </Box>
  )
}

export default PasswordForm