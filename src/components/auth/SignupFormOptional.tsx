import theme from "@/theme/theme";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Button, Box, Typography, OutlinedInput, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import FaceIcon from "@mui/icons-material/Face";
import NicknameInput from "./NicknameInput";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const SingupFormOptional = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    overflow: "hidden",
    position: "absolute",
  });

    // const handleSignup = () => {
  //   const signupFlag = apiAuthTest(signupInfo);
  //   signupFlag &&
  //     navigate("/auth/signup/success", { state: { email: signupInfo.email } });
  // };

  return (
    <>
      <Box className="base-layout">
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Button
            component="label"
            sx={{ backgroundColor: "#B2B4B8", p: 3, borderRadius: "50%" }}
          >
            <FaceIcon sx={{ fontSize: "80px", color: "black" }} />
            <VisuallyHiddenInput type="file" />
          </Button>
        </Box>
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold">
            닉네임 & 프로필 사진
          </Typography>
        </Box>
        <NicknameInput />

        <Box sx={{ textAlign: "center", mt: 7 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              bgcolor: `${theme.palette.secondary.main}`,
              borderRadius: "7px",
            }}
          >
            가입하기
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SingupFormOptional;
