import theme from "@/theme/theme";
import { checkEmailVerification } from "@/apis/user/checkEmailVerification";
import { Typography, Grid, Button, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

type EmailVerificationCodeInputpProps = {
  isSuccess: boolean;
  email: string;
  findUserInfo: string;
};

const EmailVerificationCodeInput = ({
  isSuccess,
  email,
  findUserInfo,
}: EmailVerificationCodeInputpProps) => {
  const [verificationCode, setVerificationCode] = useState("");

  const navigate = useNavigate();

  const { data, refetch } = useQuery(
    "checkEmailVerification",
    () => checkEmailVerification({ findUserInfo, email, verificationCode }),
    {
      enabled: false,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (data) {
      if (findUserInfo === "findId" && data) {
        navigate("/auth/find/id/success", {
          state: {
            id: data.id,
          },
        });
      } else if (findUserInfo === "findPassword" && data) {
        navigate("/auth/find/password/reset", {
          state: {
            userId: data.uuid,
          },
        });
      }
    }
  }, [data]);

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
              (data === false
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
            onClick={() => {
              refetch();
            }}
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
