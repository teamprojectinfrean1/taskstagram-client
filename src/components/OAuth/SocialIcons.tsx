import { Box } from "@mui/material";
import kakaoLoginButton from "@/assets/kakako_login_button.png";
import kakaoSignupButton from "@/assets/kakao_signup_button.png";
import { Link } from "react-router-dom";

type SocialIconsProps = {
  authPage: "login" | "signup";
};

const SocialIcons = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 2,
      }}
    >
      <Link to="http://124.61.74.148:8080/api/v1/oauth/KAKAO">
        <img src={kakaoLoginButton} alt="kakakoLoginButton" />
      </Link>
    </Box>
  );
};

export default SocialIcons;
