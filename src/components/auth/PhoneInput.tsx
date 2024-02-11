import "./Auth.css";
import { Box, Typography, OutlinedInput, Button } from "@mui/material";
import { checkAuthInputValidity } from "@/utils/authCheck";
import { useEffect, useState } from "react";

type PropsType = {
  phoneNumber: string;
  phoneNumberFlag: boolean;
  setPhoneNumber(phoneNumber: string): void;
  setPhoneNumberFlag(phoneNumberFlag: boolean): void;
}

const PhoneInput = ({
  phoneNumber,
  phoneNumberFlag,
  setPhoneNumber,
  setPhoneNumberFlag,
}: PropsType) => {
  const [phoneButtonName, setPhoneButtonName] = useState("인증 요청");
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    phoneButtonCheck();
  }, [phoneNumberFlag]);

  const phoneEffectComment = () => {
    if (phoneNumber) {
      return !phoneNumberFlag ? (
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
            sx={{
              position: "absolute",
              ml: 1,
              mt: 0.1,
              fontWeight: "bold",
              fontSize: "11px",
            }}
          >
            {phrase}
          </Typography>
        </>
      );
    }
  };

  const changePhrase = () => {
    const phoneEffectFlag = checkAuthInputValidity({
      type: "phoneNumber",
      phoneNumber,
    });
    setPhoneNumberFlag(phoneEffectFlag);
    phoneEffectFlag
      ? setPhrase("인증 번호가 전송되었습니다.")
      : setPhrase("휴대폰 번호를 다시 확인해주세요.");
  };

  const errorFlag = () => {
    return phrase === "휴대폰 번호를 다시 확인해주세요." ? true : false;
  };

  const phoneButtonCheck = () => {
    phoneNumberFlag
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
            value={phoneNumber}
            error={phoneNumber && errorFlag() ? true : false}
            onBlur={(e) => {
              setPhoneNumber(e.target.value);
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
            bgcolor: phoneNumberFlag ? "#173665" : "#B2B4B8",
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
