import theme from "@/theme/theme";
import { Button, Box } from "@mui/material";
import NicknameInput from "./NicknameInput";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { signupInfoState } from "@/stores/AuthStore";
import { fetchSignup } from "@/apis/user/fetchSignup";
import ProfileImageInput from "./ProfileImageInput";
import { useChangeSignupInfo } from "@/hooks/useChangeSignupInfo";
import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import ErrorHandling from "../ErrorHandling";

const SingupFormOptional = () => {
  const navigate = useNavigate();

  const { changeSignupInfo, resetSignupInfo } = useChangeSignupInfo();

  const signupInfo = useRecoilValue(signupInfoState);

  const signupMutation = useMutation((signupInfo: SignupInfo) =>
    fetchSignup(signupInfo)
  );

  useEffect(() => {
    if (signupMutation.data) {
      navigate("/auth/signup/success", {
        state: {
          nickname: signupMutation.data,
        },
      });
    }
  });

  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);

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
          isNicknameDuplicate={isNicknameDuplicate}
          setIsNicknameDuplicate={(value) => setIsNicknameDuplicate(value)}
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
              signupMutation.mutate(signupInfo);
            }}
          >
            가입하기
          </Button>
        </Box>
        <ErrorHandling
          error={signupMutation.error}
          isLoading={signupMutation.isLoading}
          feature="회원가입"
        />
      </Box>
    </>
  );
};

export default SingupFormOptional;
