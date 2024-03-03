import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const FindEmail = () => {
  const [findEmailPhoneNumber, setFindEmailPhoneNumber] = useState("");
  const [findEmailPhoneNumberFlag, setFindEmailPhoneNumberFlag] =
    useState(false);
  const [findEmailPhoneButtonOnClick, setFindEmailPhoneButtonOnClick] =
    useState(false);
  const [findEmailPhoneCertifi, setFindEmailPhoneCertifi] = useState("");
  const [findEmailPhoneCertifiFlag, setFindEmailPhoneCertifiFlag] =
    useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    findEmailPhoneCertifiFlag && navigate("/auth/find/email/success");
  }, [findEmailPhoneCertifiFlag]);

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: "15px" }}>
          계정에 등록된 휴대폰 번호를 인증하시면
        </Typography>
        <Typography sx={{ fontSize: "15px" }}>
          사용 중인 계정의 이메일 주소를 알려드립니다.
        </Typography>
      </Box>

      <Box>
        <Typography sx={{ mt: 5, ml: 0.5 }}>휴대폰 번호</Typography>
        {/* <PhoneInput
          phoneNumber={findEmailPhoneNumber}
          phoneNumberFlag={findEmailPhoneNumberFlag}
          setPhoneNumber={setFindEmailPhoneNumber}
          setPhoneNumberFlag={setFindEmailPhoneNumberFlag}
          phoneButtonOnClick={findEmailPhoneButtonOnClick}
          setPhoneButtonOnClick={setFindEmailPhoneButtonOnClick}
        />
        <PhoneCertifiInput
          phoneCertifi={findEmailPhoneCertifi}
          phoneNumberFlag={findEmailPhoneNumberFlag}
          phoneCertifiFlag={findEmailPhoneCertifiFlag}
          setPhoneCertifi={setFindEmailPhoneCertifi}
          setPhoneCertifiFlag={setFindEmailPhoneCertifiFlag}
          phoneButtonOnClick={findEmailPhoneButtonOnClick}
        /> */}
      </Box>
    </>
  );
};

export default FindEmail;
