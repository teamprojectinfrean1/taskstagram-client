import axios, { AxiosHeaders } from "axios";
import { BASE_URL } from "./domainSettings";
import { SignupInfo } from "@/models/Auth";
import { setDefaultResultOrder } from "dns";
import { defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { PictureAsPdf, PictureAsPdfSharp } from "@mui/icons-material";
import { wrap } from "module";

// const authURL = `${BASE_URL}/auth`;
// const authURL = "http://124.61.74.148:8080/api/v1/auth";
const authURL = "http://127.0.0.1:8080/api/v1/auth"
// const authURL = "http://14.33.239.204:8080/api/v1/auth";

type fetchLoginRequest = {
  id: string;
  password: string;
};

type requestEmailVerificationRequest = {
  findUserInfo: string;
  email: string;
};

type checkEmailVerificationRequest = {
  findUserInfo: string;
  email: string;
  verificationCode: string;
};

export type resetPasswordRequest = {
  userId: string;
  password: string;
};

// 이메일 중복검사
export const checkEmailExistence = async (email: string) => {
  try {
    const response = await axios.get(`${authURL}/checkMail`, {
      params: { email },
    });
    console.log(response.data);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};

// 아이디 중복검사
export const checkIdExistence = async (id: string) => {
  try {
    const response = await axios.get(`${authURL}/checkId`, {
      params: { id },
    });
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};

// 닉네임 중복검사
export const checkNicknameExistence = async (nickname: string) => {
  try {
    const response = await axios.get(`${authURL}/checkNickname`, {
      params: { nickname },
    });
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};

// 회원가입 api
export const fetchSignup = async ({
  email,
  id,
  password,
  nickname,
  profileImage,
}: SignupInfo) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("nickname", nickname);
  formData.append("email", email);
  formData.append("password", password);
  if (profileImage) {
    formData.append("profileImage", profileImage);
  }

  console.log(formData.get("profileImage"));

  try {
    const response = await axios.post(`${authURL}/join`, formData);
    // 백엔드에서 response 수정되면, 추후 res.data.data 로 변경 예정
    console.log(response.data);
    return response.data.data.nickname;
  } catch (err) {
    return false;
  }
};

// 로그인 api
export const fetchLogin = async ({ id, password }: fetchLoginRequest) => {
  try {
    const response = await axios.post(`${authURL}/login`, {
      id,
      password,
    });
    // const accessToken = response.data.data.Authorization;
    const accessToken = response.data
    sessionStorage.setItem("accessToken", accessToken);
    // return response.data.Authorization;
    return response.data
  } catch (err) {
    console.error(err);
    return false;
  }
};

// 이메일 인증 코드 요청 api(아이디 찾기, 비밀번호 찾기)
export const requestEmailVerification = async ({
  findUserInfo,
  email,
}: requestEmailVerificationRequest) => {
  try {
    // httpMethod get으로 변경할지 이야기 진행중
    const response = await axios.post(
      `${authURL}/${findUserInfo}/verification/request`,
      {
        email,
      }
    );
    return response.data.data.isSuccess;
  } catch (err) {
    console.error(err);
  }
};

// 이메일 인증 코드 확인 api(아이디 찾기, 비밀번호 찾기)
export const checkEmailVerification = async ({
  findUserInfo,
  email,
  verificationCode,
}: checkEmailVerificationRequest) => {
  try {
    // httpMethod get으로 변경할지 이야기 진행중
    const response = await axios.post(
      `${authURL}/${findUserInfo}/verification/check`,
      {
        email,
        verificationCode,
      }
    );
    console.log(response.data);
    return response.data.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

// 비밀번호 찾기(재설정) api
export const resetPassword = async ({
  userId,
  password,
}: resetPasswordRequest) => {
  try {
    let isSuccess = null;
    const response = await axios.put(
      `${authURL}/findPassword/verification/update`,
      {
        uuid: userId,
        password,
      }
    );
    if (response.data) {
      console.log(response.data);
      isSuccess = true;
    }
    return isSuccess;
  } catch (err) {
    console.error(err);
  }
};

// 카카오 소셜 로그인 api
export const KakaoLogin = async () => {
  console.log("test");
  const oauthServerType = "KAKAO";
  try {
    const response = await axios.get(
      `http://124.61.74.148:8080/api/v1/oauth/${oauthServerType}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      }
    );
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};

export const KakaoToken = async (code: string) => {
  try {
    const response = await axios.get(`http://124.61.74.148:8080/api/v1/oauth/KAKAO?code=${code}`)
  } catch(err) {

  }
}