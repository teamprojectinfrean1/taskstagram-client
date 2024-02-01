import '../Auth.css'
import { Link } from "react-router-dom";

import { Stack } from "@mui/material";

const ForgetJoinLink = () => {
  return (
    <>
      <div className="find-join-select">
        <Stack direction="row" spacing={5} style={{ fontSize: 11 }}>
          <Link
            to="/find/username"
            style={{ textDecoration: "none", color: "black" }}
          >
            이메일 찾기
          </Link>
          <span>|</span>
          <Link
            to="/find/password"
            style={{ textDecoration: "none", color: "black" }}
          >
            비밀번호 찾기
          </Link>
          <span>| </span>
          <Link to="/signup" style={{ textDecoration: "none", color: "black" }}>
            회원가입
          </Link>
        </Stack>
      </div>
    </>
  );
};

export default ForgetJoinLink;
