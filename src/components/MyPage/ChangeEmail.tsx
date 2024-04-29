import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography, Box, Button } from "@mui/material";
import NicknameInput from "../auth/NicknameInput";
import { useState } from "react";
import theme from "@/theme/theme";
import { useMutation } from "react-query";
import { changeUserInfo } from "@/apis/user/changeUserInfo";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState } from "@/stores/userStore";
import ErrorHandling from "../ErrorHandling";
import EmailInput from "../auth/EmailInput";

const ChangeEmail = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const loginType = userInfo.weaver
  const memberId = userInfo.memberId;
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);

  const validState = !!(email && !isEmailValid);
  const disabledState = !!(!isEmailValid || isEmailDuplicate);

  const changeEmailMutation = useMutation(
    ({ type, value, memberId }: any) =>
      changeUserInfo({ type, value, memberId }),
    {
      onSuccess: (data) => {
        console.log(data);
        setUserInfo({ ...userInfo, email: data });
        navigate('/mypage/change/success', {
          state: "닉네임"
        })
      },
    }
  );

  return (
    <>
      <Box
        boxShadow={10}
        sx={{
          height: "90%",
          backgroundColor: `${theme.palette.primary.light}`,
          minWidth: "37rem",
          borderRadius: "7px",
        }}
      >
        <Link to="/mypage">
          <ArrowBackIcon
            fontSize="large"
            sx={{ m: 3, color: "#5F6368", position: "absolute" }}
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
          className="base-layout"
          sx={{
            border: `1px solid ${theme.palette.primary.dark}`,
            height: "70%",
            borderRadius: "7px",
            mt: 6,
          }}
        >
          <Box sx={{ width: "90%", margin: "auto" }}>
            <Box sx={{ my: 7, textAlign: "center" }}>
              <Typography variant="h6">일정타그램에서 사용할</Typography>
              <Typography variant="h6">
                새로운 이메일을 입력해주세요.
              </Typography>
            </Box>
            <Typography sx={{ml:0.5}}>Email</Typography>
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
                mt: 5,
              }}
              disabled={!isEmailDuplicate}
              onClick={() =>
                changeEmailMutation.mutate({
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
            error={changeEmailMutation.error}
            isLoading={changeEmailMutation.isLoading}
            feature="이메일 변경"
          />
        </Box>
      </Box>
    </>
  );
};

export default ChangeEmail;
