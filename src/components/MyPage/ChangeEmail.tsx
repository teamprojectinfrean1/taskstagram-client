import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import theme from "@/theme/theme";
import { useMutation } from "react-query";
import { changeUserInfo } from "@/apis/user/changeUserInfo";
import { useRecoilState } from "recoil";
import { userInfoState } from "@/stores/userStore";
import { ErrorHandling } from "@/components";
import { EmailInput } from "@/components/Auth";
import { ChangeUserInfoRequest } from "@/apis/user/changeUserInfo";

const ChangeEmail = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const memberId = userInfo.memberId;

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);

  const mutateChangeEmail = useMutation(
    ({ type, value, memberId }: ChangeUserInfoRequest) =>
      changeUserInfo({ type, value, memberId })
  );

  useEffect(() => {
    if (!userInfo.weaver) {
      navigate("/mypage")
    }
  }, [])

  useEffect(() => {
    if (mutateChangeEmail.data) {
      setUserInfo({ ...userInfo, email: mutateChangeEmail.data });
      navigate("/mypage/change/success", {
        state: "이메일",
      });
    }
  }, [mutateChangeEmail.data]);

  return (
    <>
      <Box
        boxShadow={2}
        sx={{
          py: 5,
          backgroundColor: `${theme.palette.background.paper}`,
          width: "70%",
          minWidth: "35rem",
          m: "auto",
          borderRadius: "7px",
        }}
      >
        <Link to="/mypage">
          <ArrowBackIcon
            fontSize="large"
            sx={{ ml: 3, color: "#5F6368", position: "absolute" }}
          />
        </Link>
        <Box sx={{ mt: 5 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            이메일 변경
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 6,
            mx: "auto",
            py: 10,
            backgroundColor: "white",
            borderRadius: "7px",
            border: `1px solid ${theme.palette.text.primary}`,
            width: "60%",
            minWidth: "30rem",
            height: "70%",
          }}
        >
          <Box sx={{ width: "90%", margin: "auto" }}>
            <Box sx={{ my: 1, textAlign: "center" }}>
              <Typography variant="h6">일정타그램에서 사용할</Typography>
              <Typography variant="h6">
                새로운 이메일을 입력해주세요.
              </Typography>
            </Box>
            <Typography sx={{ mt: 5, ml: 0.5 }}>Email</Typography>
            <EmailInput
              email={email}
              setEmail={(value) => setEmail(value)}
              isEmailValid={isEmailValid}
              setIsEmailValid={(value) => setIsEmailValid(value)}
              isEmailDuplicate={isEmailDuplicate}
              setIsEmailDuplicate={(value) => setIsEmailDuplicate(value)}
            />
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{
                bgcolor: `${theme.palette.secondary.main}`,
                borderRadius: "7px",
                mt: 6,
              }}
              disabled={!isEmailDuplicate}
              onClick={() =>
                mutateChangeEmail.mutate({
                  type: "email",
                  value: email,
                  memberId,
                })
              }
            >
              변경
            </Button>
          </Box>
          <ErrorHandling
            error={mutateChangeEmail.error}
            isLoading={mutateChangeEmail.isLoading}
            feature="이메일 변경"
          />
        </Box>
      </Box>
    </>
  );
};

export default ChangeEmail;
