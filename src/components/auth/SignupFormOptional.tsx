import theme from "@/theme/theme";
import { Button, Box, Typography, OutlinedInput, Grid } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import FaceIcon from "@mui/icons-material/Face";
import NicknameInput from "./NicknameInput";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { signupInfoState } from "@/stores/AuthStore";
import { fetchSignup } from "@/utils/authCheck";
import ProfileImageInput from "./ProfileImageInput";
import { SignupInfoTypes } from "./SignupFormRequired";
import { useChangeSignupInfo } from "@/hooks/useChangeSignupInfo";

const SingupFormOptional = () => {
  const { changeSignupInfo, resetSignupInfo } = useChangeSignupInfo();

  const [signupInfo, setSignupInfo] = useRecoilState(signupInfoState);

  const handleSignup = ({ email, id, passwd, nickname, profileImage }: any) => {
    const signupFlag = fetchSignup({
      email,
      id,
      passwd,
      nickname,
      profileImage,
    });
    // signupFlag &&
    //   navigate("/auth/signup/success", { state: { id: signupInfo.id } });
  };

  return (
    <>
      <Link to="/auth/login">
        <ArrowBackIcon
          fontSize="large"
          sx={{ m: 3, color: "#5F6368" }}
          onClick={resetSignupInfo}
        />
      </Link>
      <Box className="base-layout">
        <ProfileImageInput
          profileImage={signupInfo.profileImage}
          setProfileImage={(value) =>
            changeSignupInfo({ key: "profileImage", value })
          }
        />
        <NicknameInput
          nickname={signupInfo.nickname}
          setNickname={(value) => changeSignupInfo({ key: "nickname", value })}
        />

        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              bgcolor: `${theme.palette.secondary.main}`,
              borderRadius: "7px",
            }}
            onClick={() => {
              handleSignup({ ...signupInfo });
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
