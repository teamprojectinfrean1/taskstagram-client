import theme from "@/theme/theme";
import { Typography, OutlinedInput, Grid, Button } from "@mui/material";
import { useState } from "react";
// import { handleEmailCertifiNumber } from "@/utils/authCheck";
import { useNavigate } from "react-router-dom";

type FindIdEmailCertifiInputProps = {
  findIdEmailButtonState: boolean;
};

const EmailVerificationCodeInput = ({
  findIdEmailButtonState,
}: FindIdEmailCertifiInputProps) => {
  const navigate = useNavigate();

  // 이메일 인증 api 구현 완료 시 활용할 예정
  // const checkEmailCertifiNumber = (emailCertifi : string) => {
  //   const response = handleEmailCertifiNumber(emailCertifi);
  //   setEmailCertifiFlag(response);
  //   if (response) {
  //     navigate("/auth/find/id/success");
  //   }
  // };

  const [emailCertifi, setEmailCertifi] = useState("");
  const [emailCertifiFlag, setEmailCertifiFlag] = useState(false);
  const emailCertifiState = !!(emailCertifi && !emailCertifiFlag);

  return (
    <>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={8}>
          <OutlinedInput
            type="number"
            fullWidth
            size="small"
            placeholder={"인증번호 입력"}
            value={emailCertifi}
            error={emailCertifiState}
            onChange={(e) => {
              setEmailCertifi(e.target.value);
            }}
            sx={{
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                { "-webkit-appearance": "none", margin: 0 },
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
            disabled={!findIdEmailButtonState}
            onClick={() => {
              // 이메일 인증 api 구현 완료 시 활용할 예정
              // checkEmailCertifiNumber(emailCertifi);
            }}
          >
            인증
          </Button>
        </Grid>
      </Grid>
      {emailCertifiState && (
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
          이메일 인증을 완료해주세요.
        </Typography>
      )}
    </>
  );
};

export default EmailVerificationCodeInput;
