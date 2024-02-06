import "./Auth.css";
import { Box, Typography, OutlinedInput, Button } from "@mui/material";
import { effectCheck } from "@/utils/authCheck";
import { useEffect, useState } from "react";

interface PropsType {
  phoneNumber: string;
  phoneNumberFlag: boolean;
  setPhoneNumber(phoneNumber: string): void;
  setPhoneNumberFlag(phoneNumberFlag: boolean): void;
}

const PhoneInput = (props: PropsType) => {
  const [phoneButtonName, setPhoneButtonName] = useState("인증 요청");
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    phoneButtonCheck();
  }, [props.phoneNumberFlag]);

  const phoneEffectComment = () => {
    if (props.phoneNumber) {
      return !props.phoneNumberFlag ? (
        <>
          <Box className="error-font">
            <Typography sx={{ fontWeight: "bold", fontSize: "11px" }}>
              {phrase}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Typography 
            sx={{ position: 'absolute', ml: 1, mt: 0.1, fontWeight: "bold", fontSize: "11px" }}
          >
            {phrase}
          </Typography>
        </>
      );
    }
  };

  const changePhrase = () => {
    const phoneEffectFlag = effectCheck({
      type: "phoneNumber",
      phoneNumber: props.phoneNumber,
    });
    props.setPhoneNumberFlag(phoneEffectFlag);
    phoneEffectFlag
      ? setPhrase("인증 번호가 전송되었습니다.")
      : setPhrase("휴대폰 번호를 다시 확인해주세요.");
  };

  const errorFlag = () => {
    return phrase === "휴대폰 번호를 다시 확인해주세요." ? true : false;
  };

  const phoneButtonCheck = () => {
    console.log(props.phoneNumberFlag);
    props.phoneNumberFlag
      ? setPhoneButtonName("재전송")
      : setPhoneButtonName("인증 요청");
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
            placeholder={"01012345678"}
            error={props.phoneNumber && errorFlag() ? true : false}
            onBlur={(e) => {
              props.setPhoneNumber(e.target.value);
            }}
            sx={{
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                { "-webkit-appearance": "none", margin: 0 },
            }}
          />
          {phoneEffectComment()}
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: props.phoneNumberFlag ? "#173665" : "#B2B4B8",
            height: "38px",
          }}
          onClick={() => {
            changePhrase();
          }}
        >
          {phoneButtonName}
        </Button>
      </Box>
    </>
  );
};

export default PhoneInput;
