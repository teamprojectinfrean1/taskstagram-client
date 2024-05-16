import theme from "@/theme/theme";
import { Grid, Typography, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { checkAuthInputValidity } from "@/utils/authCheck";
import { useQuery } from "react-query";
import { requestEmailVerification } from "@/apis/user/requestEmailVerification";
import { EmailVerificationCodeInput } from "@/components/Auth";

type EmailCertificationInputProps = {
  findUserInfo: "findId" | "findPassword";
};

const EmailCertificationInput = ({
  findUserInfo,
}: EmailCertificationInputProps) => {
  const [errorState, setErrorState] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  // 이메일 유효성 검사 상태
  const validState = !!(email && !isEmailValid);

  // 이메일 인증 useQuery
  const { data, isLoading, error, refetch } = useQuery(
    "emailVerification",
    () => requestEmailVerification({ findUserInfo, email }),
    {
      enabled: false,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (validState) {
      setShowErrorMessage("이메일 형식이 올바르지 않습니다.");
      setErrorState(true);
    } else {
      setShowErrorMessage("");
      setErrorState(false);
    }
  }, [email]);

  useEffect(() => {
    if (isLoading !== undefined) {
      if (isLoading) {
        setShowErrorMessage("요청 중입니다. 잠시만 기다려주세요...");
        setErrorState(true);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (error === "Network Error") {
      setShowErrorMessage(
        "네트워크 에러가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
      setErrorState(true);
    }
  }, [error]);

  useEffect(() => {
    if (!!data) {
      setShowErrorMessage("인증 번호가 전송되었습니다.");
    }
  }, [data]);

  return (
    <>
      <Typography sx={{ mt: 5, ml: 0.5 }}>Email</Typography>
      <Grid container spacing={3}>
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
            type="email"
            fullWidth
            size="small"
            placeholder={"example@email.com"}
            value={email}
            error={errorState}
            helperText={showErrorMessage}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailValid(
                checkAuthInputValidity({
                  type: "email",
                  authValue: e.target.value,
                })
              );
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
            disabled={!isEmailValid}
            onClick={() => {
              refetch();
            }}
          >
            {data ? "재전송" : "인증요청"}
          </Button>
        </Grid>
      </Grid>
      <EmailVerificationCodeInput
        isSuccess={!!data}
        email={email}
        findUserInfo={findUserInfo}
      />
    </>
  );
};

export default EmailCertificationInput;
