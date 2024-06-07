import theme from "@/theme/theme";
import { Button, Box, Typography } from "@mui/material";
import NicknameInput from "./NicknameInput";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { signupInfoState } from "@/stores/authStore";
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
  const mutateSignup = useMutation((signupInfo: SignupInfo) =>
    fetchSignup(signupInfo)
  );

  useEffect(() => {
    if (!signupInfo.email || !signupInfo.id || !signupInfo.password) {
      navigate("/auth/signup/required");
    }
  }, []);

  useEffect(() => {
    if (mutateSignup.data) {
      navigate("/auth/signup/success", {
        state: {
          nickname: mutateSignup.data,
        },
      });
    }
  });

  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);

  const [signupDuplicate, setSignupDuplicate] = useState(false);

  useEffect(() => {
    if (signupInfo.nickname) {
      setSignupDuplicate(!isNicknameDuplicate);
    } else {
      setSignupDuplicate(false);
    }
  }, [signupInfo.nickname, isNicknameDuplicate]);

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

        <Typography
          sx={{
            mt: 4,
            fontSize: "11px",
            color: `${theme.palette.text.primary}`,
          }}
        >
          * 닉네임을 입력하지 않으면, 자동으로 아이디가 닉네임으로 대체됩니다.
        </Typography>
        <Typography sx={{ mt: 1, ml: 0.5 }}>Nickname</Typography>
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
            disabled={signupDuplicate}
            onClick={() => {
              mutateSignup.mutate(signupInfo);
            }}
          >
            가입하기
          </Button>
        </Box>
        <ErrorHandling
          error={mutateSignup.error}
          isLoading={mutateSignup.isLoading}
          feature="회원가입"
        />
      </Box>
    </>
  );
};

export default SingupFormOptional;
