import { Box, Button } from "@mui/material";
import kakaoLoginButton from "@/assets/kakako_login_button.png";
import kakaoSignupButton from "@/assets/kakao_signup_button.png";
import { useQuery } from "react-query";
import { KakaoLogin } from "@/apis/auth";
import { useEffect } from "react";
import axios from "axios";
import { Route, useLocation, useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";

type SocialIconsProps = {
  authPage: "login" | "signup";
};

const SocialIcons = ({ authPage }: SocialIconsProps) => {

  const REST_API_KEY = "bc4748893a2293463f2fd3d2d29bb8d3";
  const REDIRECT_URL = "http://localhost:3000/oauth/redirected/kakao";

  return (
    <Box
      className="base-layout"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        mt: 2,
      }}
    >
      {/* {authPage === "login" ? (
        <Button
          onClick={() => {
            refetch();
          }}
        >
          <img src={kakaoLoginButton} alt="kakakoLoginButton" />
        </Button>
      ) : (
        <img src={kakaoSignupButton} alt="kakaoSignupButton" />
      )} */}
      <Link to="http://124.61.74.148:8080/api/v1/oauth/KAKAO">
        <img src={kakaoLoginButton} alt="kakakoLoginButton" />
      </Link>
    </Box>
  );
};

export default SocialIcons;
