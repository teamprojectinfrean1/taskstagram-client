import { useNavigate, Link } from "react-router-dom";
import SocialIcons from "../common/SocialIcons";

import { Button, Divider, OutlinedInput } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SignupForm = () => {
  const navigate = useNavigate();

  return (
    <>
      <Link to="/login">
        <ArrowBackIcon
          fontSize="large"
          sx={{m:3, color:"#5F6368"}}
        />
      </Link>
      <div className="base-layout">
        <h2>회원가입</h2>
        <p className="form-name">Email</p>
        <OutlinedInput
          fullWidth
          size="small"
          placeholder={"example@email.com"}
          sx={{ mt: 1 }}
        />
        <p className="form-name">Password</p>
        <OutlinedInput
          fullWidth
          size="small"
          placeholder={"비밀번호"}
          sx={{ mt: 1 }}
        />
        <p className="form-name">Password check</p>
        <OutlinedInput
          fullWidth
          size="small"
          placeholder={"비밀번호 확인"}
          sx={{ mt: 1 }}
        />
        <div>
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 3, width: "100%", bgcolor: "#42829E", borderRadius: "8px" }}
          >
            가입하기
          </Button>
        </div>
        <Divider sx={{mt: 3}}>간편 회원가입</Divider>
        <SocialIcons />
      </div>
    </>
  );
};

export default SignupForm;
