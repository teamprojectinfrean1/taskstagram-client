import { Box, Button } from "@mui/material";
import kakaoLoginButton from "@/assets/kakako_login_button.png";
import kakaoSignupButton from "@/assets/kakao_signup_button.png";
import { useQuery } from "react-query";
import { KakaoLogin } from "@/apis/auth";

type SocialIconsProps = {
  authPage: "login" | "signup";
};

const SocialIcons = ({ authPage }: SocialIconsProps) => {
  const { data, refetch } = useQuery("KakaoLogin", () => KakaoLogin(), {
    cacheTime: 0,
    enabled: false
  });

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
        <Button
          onClick={() => {
            refetch();
          }}
        >
          <img src={kakaoLoginButton} alt="kakakoLoginButton" />
        </Button>
      ) : (
        <img src={kakaoSignupButton} alt="kakaoSignupButton" />
      )}
    </Box>
  );
};

export default SocialIcons;
