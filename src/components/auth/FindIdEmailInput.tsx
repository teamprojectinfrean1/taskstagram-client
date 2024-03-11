import theme from "@/theme/theme";
import { Grid, Typography, Button, OutlinedInput } from "@mui/material";
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
  const [findIdEmailInput, setFindIdEmailInput] = useState("");
  const [findIdEmailValidityFlag, setFindIdEmailValidityFlag] = useState(false);
  const [findIdEmailButtonName, setFindIdEmailButtonName] = useState("인증요청")

  const findIdEmailValidityState = !!(
    findIdEmailInput && !findIdEmailValidityFlag
  );
  
  useEffect(() => {
    if (findIdEmailValidityFlag && findIdEmailButtonState) {
      setFindIdEmailButtonName("재전송")
    } else {
      setFindIdEmailButtonState(false)
      setFindIdEmailButtonName("인증요청")
    }
  }, [findIdEmailValidityFlag, findIdEmailButtonState])

  const changeViewEmailValidity = () => {
    if (findIdEmailValidityState ) {
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
    } else if (findIdEmailValidityFlag && findIdEmailButtonState) {
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
          <OutlinedInput
            type="email"
            fullWidth
            size="small"
            placeholder={"example@email.com"}
            value={findIdEmailInput}
            error={findIdEmailValidityState}
            onChange={(e) => {
              setFindIdEmailInput(e.target.value);
              setFindIdEmailValidityFlag(
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
            disabled={!findIdEmailValidityFlag}
            onClick={() => {
              // refetch();
              setFindIdEmailButtonState(true)
            }}
          >
            {findIdEmailButtonName}
          </Button>
        </Grid>
      </Grid>
      {/* <AuthResultModal
        type="email"
        showModal={showModal}
        isSuccess={emailDuplicateFlag}
        handleClose={() => setShowModal(false)}
      /> */}
      {changeViewEmailValidity()}
    </>
  );
};

export default FindIdEmailInput;
