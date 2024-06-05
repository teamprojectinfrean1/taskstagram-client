import { Box } from "@mui/material";
import kakaoLoginButton from "@/assets/kakakoLoginButton.png";
import { Link } from "react-router-dom";

const SocialIcons = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 2,
      }}
    >
      <Link to="https://mcpark.info/api/v1/oauth/KAKAO">
        <img src={kakaoLoginButton} alt="kakakoLoginButton" />
      </Link>
    </Box>
  );
};

export default SocialIcons;
