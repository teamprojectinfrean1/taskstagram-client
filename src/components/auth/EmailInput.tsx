import theme from "@/theme/theme";
import { checkAuthInputValidity } from "@/utils/authCheck";
import { Typography, OutlinedInput, Grid, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchEmailDupicate } from "@/apis/auth";

type EmailInputProps = {
  email: string;
  emailValidityFlag: boolean;
  setEmail(email: string): void;
  setEmailValidityFlag(value: boolean): void;
  emailDuplicateFlag: boolean;
  setEmailDuplicateFlag(value: boolean): void;
};

const EmailInput = ({
  email,
  setEmail,
  emailValidityFlag,
  setEmailValidityFlag,
  emailDuplicateFlag,
  setEmailDuplicateFlag,
}: EmailInputProps) => {
  const [isClickEmailButton, setIsClickEmailButton] = useState(false);
  const [emailErrorState, setEmailErrorState] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  
  const emailValidityState = !!(email && !emailValidityFlag);
  const emailIsDisabled = !!(!emailValidityFlag || emailDuplicateFlag);

  const { data, refetch } = useQuery(
    "checkMail",
    () => fetchEmailDupicate({ email, setEmailErrorMessage, setEmailErrorState }),
    { enabled: false, cacheTime: 0 }
  );

  useEffect(() => {
    setIsClickEmailButton(false);
    if (emailValidityState) {
      setEmailErrorMessage("이메일 형식이 올바르지 않습니다.");
      setEmailErrorState(true);
    } else {
      setEmailErrorMessage("");
      setEmailErrorState(false);
    }
  }, [email]);

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setEmailDuplicateFlag(data)
    }
  }, [data])

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={9}>
          <OutlinedInput
            type="email"
            fullWidth
            size="small"
            placeholder={"example@email.com"}
            value={email}
            error={emailErrorState}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailValidityFlag(
                checkAuthInputValidity({
                  type: "email",
                  authValue: e.target.value,
                })
              );
            }}
          />
          <Typography
            sx={{
              position: "absolute",
              mt: 0.1,
              ml: 1,
              fontWeight: "bold",
              fontSize: "11px",
              color: theme.palette.error.main,
            }}
          >
            {emailErrorMessage}
          </Typography>
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
            disabled={emailIsDisabled}
            onClick={() => {
              refetch();
              setIsClickEmailButton(true);
            }}
          >
            {emailDuplicateFlag ? "확인 완료" : "중복 확인"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default EmailInput;
