import theme from "@/theme/theme";
import { Button, Box } from "@mui/material";
import NicknameInput from "./NicknameInput";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue} from "recoil";
import { signupInfoState } from "@/stores/AuthStore";
import { fetchSignup } from "@/apis/auth";
import ProfileImageInput from "./ProfileImageInput";
import { useChangeSignupInfo } from "@/hooks/useChangeSignupInfo";
import { useQuery } from "react-query";
import { useEffect } from "react";

const SingupFormOptional = () => {
  const navigate = useNavigate();

  const { changeSignupInfo, resetSignupInfo } = useChangeSignupInfo();

  const signupInfo = useRecoilValue(signupInfoState);

  const { data, refetch } = useQuery(
    "signup",
    () => fetchSignup({ ...signupInfo }),
    { enabled: false, cacheTime: 0 }
  );
  
  useEffect(() => {
    // api response 값 변경 되면, data.isSuccess로 변경 예정
    if (data) {
      navigate("/auth/signup/success", {state : data.userNickname})
    }
  }, [data])

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
              refetch()
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
