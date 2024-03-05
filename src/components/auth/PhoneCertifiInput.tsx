import theme from "@/theme/theme";
import { Typography, OutlinedInput, Button, Grid } from "@mui/material";
import { phoneCertifiCheck } from "@/utils/authCheck";

type PhoneCertifiInputProps = {
  phoneCertifi: string;
  phoneNumberFlag: boolean;
  phoneCertifiFlag: boolean;
  setPhoneCertifi(phoneNumber: string): void;
  setPhoneCertifiFlag(phoneNumberFlag: boolean): void;
  phoneButtonOnClick: boolean;
};

const PhoneCertifiInput = ({
  phoneCertifi,
  phoneCertifiFlag,
  setPhoneCertifi,
  setPhoneCertifiFlag,
  phoneButtonOnClick,
}: PhoneCertifiInputProps) => {
  const changeViewPhoneCertifiValidity = () => {
    if (phoneCertifi) {
      return (
        <Typography
          sx={{
            position: "absolute",
            mt: 0.1,
            ml: 1,
            fontWeight: "bold",
            fontSize: "11px",
            ...(phoneCertifiFlag ? {} : { color: theme.palette.error.main }),
          }}
        >
          {phoneCertifiFlag
            ? "인증이 완료되었습니다."
            : "인증 번호를 확인해주세요."}
        </Typography>
      );
    }
  };

  return (
    <>
      <Typography sx={{ mt: 2.5, ml: 0.5 }}>인증 번호</Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <OutlinedInput
            type="number"
            fullWidth
            size="small"
            placeholder={"인증번호 6자리"}
            error={phoneCertifi && !phoneCertifiFlag ? true : false}
            value={phoneCertifi}
            onChange={(e) => {
              setPhoneCertifi(e.target.value);
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
            disabled={!phoneButtonOnClick}
            onClick={() => {
              setPhoneCertifiFlag(phoneCertifiCheck(phoneCertifi));
            }}
          >
            인증
          </Button>
        </Grid>
      </Grid>
      {changeViewPhoneCertifiValidity()}
    </>
  );
};

export default PhoneCertifiInput;
