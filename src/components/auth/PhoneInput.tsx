import theme from "@/theme/theme";
import { Typography, OutlinedInput, Button, Grid } from "@mui/material";
import { checkAuthInputValidity } from "@/utils/authCheck";
import { useEffect, useState } from "react";

type PropsType = {
  phoneNumber: string;
  phoneNumberFlag: boolean;
  setPhoneNumber(phoneNumber: string): void;
  setPhoneNumberFlag(phoneNumberFlag: boolean): void;
  phoneButtonOnClick: boolean;
  setPhoneButtonOnClick(value: boolean): void;
};

const PhoneInput = ({
  phoneNumber,
  phoneNumberFlag,
  setPhoneNumber,
  setPhoneNumberFlag,
  phoneButtonOnClick,
  setPhoneButtonOnClick,
}: PropsType) => {
  const [phoneButtonName, setPhoneButtonName] = useState("인증요청");

  useEffect(() => {
    if (phoneNumberFlag && phoneButtonOnClick) {
      setPhoneButtonName("재전송");
    } else {
      setPhoneButtonOnClick(false);
      setPhoneButtonName("인증요청");
    }
  }, [phoneNumberFlag, phoneButtonOnClick]);

  const changeViewPhoneValidity = () => {
    if (phoneNumber) {
      if (!phoneNumberFlag) {
        return (
          <Typography
            sx={{
              position: "absolute",
              mt: 0.1,
              ml: 1,
              fontWeight: "bold",
              fontSize: "11px",
              color: `${theme.palette.error.main}`,
            }}
          >
            휴대폰 번호 형식이 올바르지 않습니다.
          </Typography>
        );
      } else if (phoneNumberFlag && phoneButtonOnClick) {
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
    }
  };

  const handleButtonClick = () => {
    if (!phoneNumberFlag) {
      setPhoneButtonName("인증요청");
    } else {
      setPhoneButtonOnClick(true);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <OutlinedInput
            type="number"
            fullWidth
            size="small"
            placeholder={"01012345678"}
            value={phoneNumber}
            error={phoneNumber && !phoneNumberFlag ? true : false}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setPhoneNumberFlag(
                checkAuthInputValidity({
                  type: "phoneNumber",
                  authValue: e.target.value,
                })
              );
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
            onClick={handleButtonClick}
            disabled={!phoneNumberFlag}
          >
            {phoneButtonName}
          </Button>
        </Grid>
      </Grid>
      {changeViewPhoneValidity()}
    </>
  );
};

export default PhoneInput;
