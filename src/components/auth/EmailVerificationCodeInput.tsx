import { checkEmailVerification } from "@/apis/auth";
import theme from "@/theme/theme";
import { Typography, OutlinedInput, Grid, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
// import { handleEmailCertifiNumber } from "@/utils/authCheck";
import { useNavigate } from "react-router-dom";

type FindIdEmailCertifiInputProps = {
  findIdEmailButtonState: boolean;
};

const EmailVerificationCodeInput = ({ isSuccess, email, findUserInfo }: any) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [emailCertifiFlag, setEmailCertifiFlag] = useState(false);
  const emailCertifiState = !!(verificationCode && !emailCertifiFlag);

  const navigate = useNavigate();

  const { data, refetch } = useQuery(
    "checkEmailVerification",
    () => checkEmailVerification({ findUserInfo, email, verificationCode }),
    {
      enabled: false,
      cacheTime: 0,
      onSuccess: (data) => {
        if (findUserInfo === 'findId' && data) {
          navigate("/auth/find/id/success", {state: {
            id: data.id,
            nickname: data.nickname
          }})
        } else if (findUserInfo === 'findPassword' && data) {
          console.log(data)
          navigate("/auth/find/password/reset", { state: {
            userId : data.uuid
          }})
        }
      },
    }
  );

  return (
    <>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={8}>
          <OutlinedInput
            fullWidth
            size="small"
            placeholder={"인증번호 입력"}
            value={verificationCode}
            error={emailCertifiState}
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
            onClick={() => {
              refetch();
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
          인증 번호를 확인해주세요.
        </Typography>
      )}

      {isSuccess !== undefined && (
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "red" }}>
            인증 번호가 오지 않나요? 작성하신 이메일을 다시 확인해주세요.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default EmailVerificationCodeInput;
