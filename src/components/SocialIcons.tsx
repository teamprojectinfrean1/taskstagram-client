import { Box } from "@mui/material";
import kakaoLoginButton from "@/assets/kakako_login_button.png";
import kakaoSignupButton from "@/assets/kakao_signup_button.png";

type PropsType = {
  authPage: "login" | "signup";
};

const SocialIcons = ({ authPage }: PropsType) => {
  return (
    <Box
      className="base-layout"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        mt: 2,
      }}
    >
      {authPage === "login" ? (
        <img src={kakaoLoginButton} alt="kakakoLoginButton" />
      ) : (
        <img src={kakaoSignupButton} alt="kakaoSignupButton" />
      )}
    </Box>
  );
};

export default SocialIcons;
