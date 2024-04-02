import theme from "@/theme/theme";
import { checkAuthInputValidity } from "@/utils/authCheck";
import { Grid, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { checkEmailExistence } from "@/apis/auth";

type EmailInputProps = {
  email: string;
  setEmail(email: string): void;
  isEmailValid: boolean;
  setIsEmailValid(value: boolean): void;
  isEmailDuplicate: boolean;
  setIsEmailDuplicate(value: boolean): void;
};

const EmailInput = ({
  email,
  setEmail,
  isEmailValid,
  setIsEmailValid,
  isEmailDuplicate,
  setIsEmailDuplicate,
}: EmailInputProps) => {
  const [errorState, setErrorState] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");

  // 이메일 유효성 검사 상태
  const validState = !!(email && !isEmailValid);
  // 이메일 중복 검사 상태
  const disabledState = !!(!isEmailValid || isEmailDuplicate);

  const { data, refetch } = useQuery(
    "checkMail",
    () => checkEmailExistence(email),
    {
      enabled: false,
      cacheTime: 0,
      onSuccess: (data) => {
        setIsEmailDuplicate(data);
        if (!data) {
          setShowErrorMessage(
            "이미 가입된 이메일입니다. 다른 이메일을 입력해주세요."
          );
          setErrorState(true);
        } else {
          setShowErrorMessage("");
          setErrorState(false);
        }
      },
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

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={9}>
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
            disabled={isEmailDuplicate}
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
        <Grid item xs={3}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: `${theme.palette.secondary.main}`,
              height: "41px",
              borderRadius: "7px",
            }}
            disabled={disabledState}
            onClick={() => {
              refetch();
            }}
          >
            {isEmailDuplicate ? "확인 완료" : "중복 확인"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default EmailInput;
