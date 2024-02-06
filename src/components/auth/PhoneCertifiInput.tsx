import "./Auth.css";
import { Box, Typography, OutlinedInput, Button } from "@mui/material";
import { phoneNumberDoubleCheck } from "@/utils/authCheck";
import { useState } from "react";

interface PropsType {
  phoneCertifi: string;
  phoneNumberFlag: boolean;
  phoneCertifiFlag: boolean;
  setPhoneCertifi(phoneNumber: string): void;
  setPhoneCertifiFlag(phoneNumberFlag: boolean): void;
}

const PhoneCertifiInput = (props: PropsType) => {
  const phoneCertifiEffectCheck = () => {
    if (props.phoneCertifi) {
      return !props.phoneCertifiFlag ? (
        <>
          <Box className="error-font">
            <Typography sx={{ fontWeight: "bold", fontSize: "11px" }}>
              인증 번호를 다시 확인해주세요.
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Typography
            sx={{ ml: 1, mt: 0.1, fontWeight: "bold", fontSize: "11px" }}
          >
            인증이 완료되었습니다.
          </Typography>
        </>
      );
    }
  };

  return (
    <>
      <Typography sx={{ mt: 3, ml: 0.5 }}>휴대폰 번호</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <OutlinedInput
            type="number"
            fullWidth
            size="small"
            placeholder={"인증번호 6자리"}
            error={props.phoneCertifi && !props.phoneCertifiFlag ? true : false}
            onBlur={(e) => {
              props.setPhoneCertifi(e.target.value);
              // props.setPhoneCertifiFlag(
              //   effectCheck({
              //     type: "phoneNumber",
              //     phoneCertifi: e.target.value,
              //   })
              // );
            }}
            sx={{
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                { "-webkit-appearance": "none", margin: 0 },
            }}
          />
          {phoneCertifiEffectCheck()}
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: props.phoneNumberFlag ? "#173665" : "#B2B4B8",
            height: "38px",
          }}
          // onClick={() => {
          //   props.setPhoneCertifiFlag(
          //     phoneNumberDoubleCheck(props.phoneCertifi)
          //   );
          // }}
        >
          인증
        </Button>
      </Box>
    </>
  );
};

export default PhoneCertifiInput;
