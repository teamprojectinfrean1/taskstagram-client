import "./Auth.css";
import { Link } from "react-router-dom";

import { Box, Typography, Divider, Button, OutlinedInput } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const FindEmail = () => {
  return (
    <>
      <Link to="/auth">
        <ArrowBackIcon fontSize="large" sx={{ m: 3, color: "#5F6368" }} />
      </Link>
      <Box className="find-layout">
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            이메일 찾기
          </Typography>
          <Divider sx={{ mt: 4, mb: 3 }} />
          <Typography sx={{ fontSize: "15px" }}>
            계정에 등록된 휴대폰 번호를 인증하시면
          </Typography>
          <Typography sx={{ fontSize: "15px" }}>
            사용 중인 계정의 이메일 주소를 알려드립니다.
          </Typography>
        </Box>

        <Typography sx={{ mt: 7, ml: 0.5 }}>휴대폰 번호</Typography>
        <Box className="phoneinput-button">
          <OutlinedInput size="small" placeholder={"01012345678"} />
          <Button
            variant="contained"
            sx={{ bgcolor: "#B2B4B8", height: "38px" }}
          >
            인증요청
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default FindEmail;
