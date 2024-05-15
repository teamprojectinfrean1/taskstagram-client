import theme from "@/theme/theme";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import PasswordInput from "../Auth/PasswordInput";
import { useState, useEffect } from "react";
import PresentPasswordInput from "./PresentPasswordInput";
import PasswordConfirmationInput from "../Auth/PasswordConfirmationInput";
import { useMutation } from "react-query";
import { changeUserInfo } from "@/apis/user/changeUserInfo";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/stores/userStore";
import ErrorHandling from "../ErrorHandling";
import { ChangeUserInfoRequest } from "@/apis/user/changeUserInfo";

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

  const changePasswordMutation = useMutation(
    ({ type, value, memberId }: ChangeUserInfoRequest) =>
      changeUserInfo({ type, value, memberId })
  );

  useEffect(() => {
    if (changePasswordMutation.data) {
      console.log(changePasswordMutation.data);
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
        boxShadow={10}
        sx={{
          height: "90%",
          backgroundColor: "white",
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
            비밀번호 변경
          </Typography>
        </Box>
        <Box
          className="base-layout"
          sx={{
            border: "1px solid #F0F0F0",
            borderRadius: "7px",
            mt: 6,
            p: 2,
          }}
        >
          <Typography sx={{ mb: 1, color: `${theme.palette.text.primary}` }}>
            현재 비밀번호
          </Typography>
          <PresentPasswordInput
            isError={changePasswordMutation.error === 304 ? true : false}
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
            border: "1px solid #F0F0F0",
            borderRadius: "7px",
            mt: 2,
            p: 2,
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
              changePasswordMutation.mutate({
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
            error={changePasswordMutation.error}
            isLoading={changePasswordMutation.isLoading}
            feature="비밀번호 변경"
          />
        </Box>
      </Box>
    </>
  );
};

export default ChangePassword;
