import theme from "@/theme/theme";
import { checkAuthInputValidity, fetchDupicate } from "@/utils/authCheck";
import { Typography, OutlinedInput, Grid, Button } from "@mui/material";
import AuthResultModal from "./AuthResultModal";
import { useState } from "react";

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
  const [showModal, setShowModal] = useState(false);
  const emailValidityState = !!(email && !emailValidityFlag);
  const emailIsDisabled = !!(!emailValidityFlag || emailDuplicateFlag);

  const changeEmailDuplicateButton = (email: string) => {
    setShowModal(true)
    const emailDuplication = fetchDupicate({ type: "email", value: email });
    emailDuplication
      ? setEmailDuplicateFlag(true)
      : setEmailDuplicateFlag(false);
  };

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
            error={emailValidityState}
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
          {emailValidityState && (
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
              이메일 형식이 올바르지 않습니다.
            </Typography>
          )}
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
              changeEmailDuplicateButton(email);
            }}
          >
            {emailDuplicateFlag ? "확인 완료" : "중복 확인"}
          </Button>
        </Grid>
      </Grid>
      <AuthResultModal
        type="email"
        showModal={showModal}
        isSuccess={emailDuplicateFlag}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
};

export default EmailInput;
