import theme from "@/theme/theme";
import { Grid, Typography, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { checkAuthInputValidity } from "@/utils/authCheck";

type FindIdEmailInputProps = {
  findIdEmailButtonState: boolean;
  setFindIdEmailButtonState(value: boolean): void;
};

const FindIdEmailInput = ({
  findIdEmailButtonState,
  setFindIdEmailButtonState,
}: FindIdEmailInputProps) => {
  const [email, setEmail] = useState("");
  const [isEmailValidity, setIsEmailValidity] = useState(false);
  const [certifyRequestButtonLabel, setCertifyRequestButtonLabel] =
    useState("인증요청");

  const showErrorMessage = !!(email && !isEmailValidity);

  useEffect(() => {
    if (isEmailValidity && findIdEmailButtonState) {
      setCertifyRequestButtonLabel("재전송");
    } else {
      setFindIdEmailButtonState(false);
      setCertifyRequestButtonLabel("인증요청");
    }
  }, [isEmailValidity, findIdEmailButtonState]);

  const changeViewEmailValidity = () => {
    if (showErrorMessage) {
      return (
        <Typography
          sx={{
            position: "absolute",
            mt: 0.1,
            ml: 1,
            fontSize: "11px",
            fontWeight: "bold",
            color: theme.palette.error.main,
          }}
        >
          이메일 형식이 올바르지 않습니다.
        </Typography>
      );
    } else if (isEmailValidity && findIdEmailButtonState) {
      return (
        <Typography
          sx={{
            position: "absolute",
            mt: 0.1,
            ml: 1,
            fontWeight: "bold",
            fontSize: "11px",
          }}
        >
          인증 번호가 전송되었습니다.
        </Typography>
      );
    }
  };

  return (
    <>
      <Typography sx={{ mt: 5, ml: 0.5 }}>Email</Typography>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <TextField
            type="email"
            fullWidth
            size="small"
            placeholder={"example@email.com"}
            value={email}
            error={showErrorMessage}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailValidity(
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
            disabled={!isEmailValidity}
            onClick={() => {
              // refetch();
              setFindIdEmailButtonState(true);
            }}
          >
            {certifyRequestButtonLabel}
          </Button>
        </Grid>
      </Grid>
      {changeViewEmailValidity()}
    </>
  );
};

export default FindIdEmailInput;
