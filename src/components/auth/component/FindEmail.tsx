import "../Auth.css";
import { Link } from "react-router-dom";

import { Divider, Button, OutlinedInput } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const FindUsernameForm = () => {
  return (
    <>
      <Link to="/login">
        <ArrowBackIcon fontSize="large" sx={{ m: 3, color: "#5F6368" }} />
      </Link>
      <div className="find-layout">
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <h2>이메일 찾기</h2>
          <Divider sx={{ mt: 4, mb: 3 }} />
          <p>계정에 등록된 휴대폰 번호를 인증하시면</p>
          <p>사용 중인 계정의 이메일 주소를 알려드립니다.</p>
        </div>

        <p style={{ marginTop: 60, marginLeft: 3 }}>휴대폰 번호</p>
        <div className="phoneinput-button">
          <OutlinedInput size="small" placeholder={"01012345678"} />
          <Button
            variant="contained"
            sx={{ bgcolor: "#B2B4B8", height: "38px" }}
          >
            인증요청
          </Button>
        </div>
      </div>
    </>
  );
};

export default FindUsernameForm;
