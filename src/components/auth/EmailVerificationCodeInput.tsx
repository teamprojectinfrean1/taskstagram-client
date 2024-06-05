import theme from "@/theme/theme";
import { Typography, Grid, Button, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  CheckFindIdEmailVerificationResponse,
  CheckFindPasswordEmailVerificationResponse,
  CheckEmailVerificationRequest,
  checkEmailVerification,
} from "@/apis/user/checkEmailVerification";

type EmailVerificationCodeInputProps = {
  isSuccess: boolean;
  email: string;
  findUserInfo: string;
};

const EmailVerificationCodeInput = ({
  isSuccess,
  email,
  findUserInfo,
}: EmailVerificationCodeInputProps) => {
  const navigate = useNavigate();

  const [verificationCode, setVerificationCode] = useState("");
  const mutateEmailVerification = useMutation(
    ({
      findUserInfo,
      email,
      verificationCode,
    }: CheckEmailVerificationRequest) =>
      checkEmailVerification({ findUserInfo, email, verificationCode })
  );

  useEffect(() => {
    if (findUserInfo === "findId" && mutateEmailVerification.data) {
      const findIdResponse =
        mutateEmailVerification.data as CheckFindIdEmailVerificationResponse;
      navigate("/auth/find/id/success", {
        state: {
          id: findIdResponse.id,
        },
      });
    } else if (
      findUserInfo === "findPassword" &&
      mutateEmailVerification.data
    ) {
      const findPasswordResponse =
        mutateEmailVerification.data as CheckFindPasswordEmailVerificationResponse;
      navigate("/auth/find/password/reset", {
        state: {
          memberId: findPasswordResponse.memberUuid,
        },
      });
    }
  }, [mutateEmailVerification.data]);

  return (
    <>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={8}>
          <TextField
            sx={{
              "& .MuiFormHelperText-root": {
                position: "absolute",
                mt: 5,
                ml: 1,
                fontSize: "11px",
                fontWeight: "bold",
                color: theme.palette.error.main,
              },
            }}
            fullWidth
            size="small"
            placeholder={"인증번호 입력"}
            value={verificationCode}
            error={isSuccess}
            helperText={
              isSuccess &&
              (mutateEmailVerification.error === 403
                ? "인증번호를 다시 확인해주세요."
                : "인증번호를 확인해주세요.")
            }
            onChange={(e) => {
              setVerificationCode(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: `${theme.palette.secondary.main}`,
              height: "41px",
              borderRadius: "7px",
            }}
            disabled={!isSuccess}
            onClick={() =>
              mutateEmailVerification.mutate({
                findUserInfo,
                email,
                verificationCode,
              })
            }
          >
            인증
          </Button>
        </Grid>
      </Grid>

      {isSuccess && (
        <Box sx={{ mt: 7, textAlign: "center" }}>
          <Typography
            sx={{ color: `${theme.palette.error.main}`, fontSize: "12px" }}
          >
            인증 번호가 오지 않나요? 작성하신 이메일을 다시 확인해주세요.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default EmailVerificationCodeInput;
