import { useState } from "react";
import { Box, Typography } from "@mui/material";
import FindIdEmailInput from "./FindIdEmailInput";
import FindIdEmailCertifiInput from "./FindIdEmailCertifiInput";

const FindIdForm = () => {
  const [findIdEmailButtonState, setFindIdEmailButtonState] = useState(false)
  
  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: "15px" }}>
          계정에 등록된 이메일 주소를 인증하시면
        </Typography>
        <Typography sx={{ fontSize: "15px" }}>
          사용 중인 계정의 아이디를 알려드립니다.
        </Typography>
      </Box>

      <Box>
        <FindIdEmailInput 
        findIdEmailButtonState = {findIdEmailButtonState}
        setFindIdEmailButtonState = {(value) => setFindIdEmailButtonState(value)}
        />
        <FindIdEmailCertifiInput 
        findIdEmailButtonState = {findIdEmailButtonState}
        />
      </Box>
    </>
  );
};

export default FindIdForm;
