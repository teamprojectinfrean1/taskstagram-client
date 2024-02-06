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

  // useEffect(() => {
  //   console.log(props.phoneNumberFlag);
  // }, [props.phoneNumberFlag]);

  const [phoneButtonName, setPhoneButtonName] = useState("인증 요청");
  const [message, setMessage] = useState("");

  const phoneEffectCheck = () => {
    if (props.phoneNumber) {
      return !props.phoneNumberFlag ? (
        <>
          <Box className="error-font">
            <Typography sx={{ fontWeight: "bold", fontSize: "11px" }}>
              {/* 휴대폰 형식이 올바르지 않습니다. */}
              {message}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Typography
            sx={{ ml: 1, mt: 0.1, fontWeight: "bold", fontSize: "11px" }}
          >
            {/* 인증 번호가 전송되었습니다. */}
            {message}
          </Typography>
        </>
      );
    }
  };

  const test = () => {
    const a = effectCheck({
      type: "phoneNumber",
      phoneNumber: props.phoneNumber,
    });

    props.setPhoneNumberFlag(a);
    if (a) {
      setMessage("인증 번호가 전송되었습니다.")
    } else {
      setMessage("휴대폰 번호를 다시 확인해주세요.")
    }
  };

  const test2 = () => {
    console.log(test2)
    if (message === "휴대폰 번호를 다시 확인해주세요.") {
      return false
    } else {
      return true
    }
  }

  const phoneButtonCheck = () => {
    // props.setPhoneNumberFlag(
    //   effectCheck({
    //     type: "phoneNumber",
    //     phoneNumber: props.phoneNumber
    //   })
    // );
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
            error={
              props.phoneNumber && test2()
              // !effectCheck({
              //   type: "phoneNumber",
              //   phoneNumber: props.phoneNumber,
              // })
                ? true
                : false
              //  true : false
              // !effectCheck({
              //   type: "phoneNumber",
              //   phoneNumber: props.phoneNumber,
              // })
              //   ? true
              //   : false
            }
            onBlur={(e) => {
              props.setPhoneNumber(e.target.value);
              // props.setPhoneNumberFlag(
              //   effectCheck({
              //     type: "phoneNumber",
              //     phoneNumber: e.target.value,
              //   })
              // );
            }}
            sx={{
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                { "-webkit-appearance": "none", margin: 0 },
            }}
          />
          {phoneEffectCheck()}
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: props.phoneNumberFlag ? "#173665" : "#B2B4B8",
            height: "38px",
          }}
          onClick={() => {
            // props.setPhoneNumberFlag(
            //   effectCheck({
            //     type: "phoneNumber",
            //     phoneNumber: props.phoneNumber,
            //   })
            // );
            test()
            phoneButtonCheck();
          }}
        >
          {phoneButtonName}
        </Button>
      </Box>
    </>
  );
};

export default PhoneInput;
