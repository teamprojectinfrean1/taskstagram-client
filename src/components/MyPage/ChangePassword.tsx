import theme from "@/theme/theme";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import { PasswordConfirmationInput, PasswordInput } from "@/components/Auth";
import { PresentPasswordInput } from "@/components/MyPage";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/stores/userStore";
import ErrorHandling from "../ErrorHandling";
import { ChangeUserInfoPasswordRequest } from "@/apis/user/changeUserInfoPassword";
import { changeUserInfoPassword } from "@/apis/user/changeUserInfoPassword";

const ChangePassword = () => {
  const navigate = useNavigate();

  const userInfo = useRecoilValue(userInfoState);
  const memberId = userInfo.memberId;

  const [passwordInfo, setPasswordInfo] = useState({
    presentPassword: "",
    password: "",
  });

  const [isValid, setIsValid] = useState({
    isPasswordValid: false,
    isPasswordConfirmValid: false,
  });

  const changePasswordInfo = ({ key, value }: AuthInputValue) => {
    setPasswordInfo({
      ...passwordInfo,
      [key]: value,
    });
  };

  const changeIsValid = ({ key, value }: AuthisValid) => {
    setIsValid({
      ...isValid,
      [key]: value,
    });
  };

  const [isPasswordRequiredField, setIsPasswordRequiredField] = useState(false);

  const mutateChangePassword = useMutation(
    ({ type, value, memberId }: ChangeUserInfoPasswordRequest) =>
      changeUserInfoPassword({ type, value, memberId })
  );

  useEffect(() => {
    if (!userInfo.weaver) {
      navigate("/mypage")
    }
  }, [])

  useEffect(() => {
    if (mutateChangePassword.data) {
      navigate("/mypage/change/success", {
        state: "비밀번호",
      });
    }
  });

  useEffect(() => {
    const passwordInputCheck = Object.values(isValid).every(
      (flag) => flag === true
    );
    setIsPasswordRequiredField(passwordInputCheck);
  }, [isValid]);

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
          height: "40rem",
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
            비밀번호 변경
          </Typography>
        </Box>
        <Box
          className="base-layout"
          sx={{
            backgroundColor: "white",
            border: `1px solid ${theme.palette.text.primary}`,
            borderRadius: "7px",
            mt: 5,
            p: 3,
          }}
        >
          <Typography sx={{ mb: 1, color: `${theme.palette.text.primary}` }}>
            현재 비밀번호
          </Typography>
          <PresentPasswordInput
            isError={mutateChangePassword.error === 304 ? true : false}
            presentPassword={passwordInfo.presentPassword}
            setPresentPassword={(value) =>
              setPasswordInfo({
                ...passwordInfo,
                presentPassword: value,
              })
            }
          />
        </Box>
        <Box
          className="base-layout"
          sx={{
            backgroundColor: "white",
            border: `1px solid ${theme.palette.text.primary}`,
            borderRadius: "7px",
            mt: 2,
            p: 3,
          }}
        >
          <Typography sx={{ mb: 1, color: `${theme.palette.text.primary}` }}>
            신규 비밀번호
          </Typography>
          <PasswordInput
            password={passwordInfo.password}
            setPassword={(value) => {
              changePasswordInfo({ key: "password", value });
            }}
            isPasswordValid={isValid.isPasswordValid}
            setIsPasswordValid={(value) => {
              changeIsValid({ key: "isPasswordValid", value });
            }}
          />
          <Box sx={{ mt: 3 }}>
            <Typography sx={{ mb: 1, color: `${theme.palette.text.primary}` }}>
              신규 비밀번호 확인
            </Typography>
            <PasswordConfirmationInput
              password={passwordInfo.password}
              isPasswordConfirmValid={isValid.isPasswordConfirmValid}
              setIsPasswordConfirmValid={(value) => {
                changeIsValid({ key: "isPasswordConfirmValid", value });
              }}
            />
          </Box>
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 4,
              bgcolor: `${theme.palette.secondary.main}`,
              borderRadius: "7px",
            }}
            disabled={!isPasswordRequiredField}
            onClick={() => {
              mutateChangePassword.mutate({
                type: "password",
                value: {
                  currentPassword: passwordInfo.presentPassword,
                  updatePassword: passwordInfo.password,
                },
                memberId,
              });
            }}
          >
            확인
          </Button>
          <ErrorHandling
            error={mutateChangePassword.error}
            isLoading={mutateChangePassword.isLoading}
            feature="비밀번호 변경"
          />
        </Box>
      </Box>
    </>
  );
};

export default ChangePassword;
