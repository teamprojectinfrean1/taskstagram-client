import { unauthorizedAxios } from "./domainSettings";
import { SignupInfo } from "@/models/Auth";

const authPath = "auth";
// const authPath = "http://127.0.0.1:8080/api/v1/auth"

type fetchLoginRequest = {
  email: string;
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
    const response = await unauthorizedAxios.get(`${authPath}/checkMail`, {
      params: { email },
    });
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};

// 아이디 중복검사
export const checkIdExistence = async (id: string) => {
  try {
    const response = await unauthorizedAxios.get(`${authPath}/checkId`, {
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
    const response = await unauthorizedAxios.get(`${authPath}/checkNickname`, {
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
  try {
    const response = await unauthorizedAxios.post(`${authPath}/join`, {
      email,
      id,
      password,
      nickname: nickname ? nickname : id,
      profileImage,
    });
    // 백엔드에서 response 수정되면, 추후 res.data.data 로 변경 예정
    return response.data.nickname;
  } catch (err) {
    return false;
  }
};

// 로그인 api
export const fetchLogin = async ({ email, password }: fetchLoginRequest) => {
  try {
    const response = await unauthorizedAxios.post(`${authPath}/login`, {
      email,
      password,
    });
    const accessToken = response.data;
    sessionStorage.setItem("accessToken", accessToken);
    return response.data;
  } catch (err) {
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
    const response = await unauthorizedAxios.post(
      `${authPath}/${findUserInfo}/verification/request`,
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
    const response = await unauthorizedAxios.post(
      `${authPath}/${findUserInfo}/verification/check`,
      {
        email,
        verificationCode,
      }
    );
    console.log(response.data)
    return response.data.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const resetPassword = async ({
  userId,
  password,
}: resetPasswordRequest) => {
  try {
    let isSuccess = null;
    const response = await unauthorizedAxios.put(
      `${authPath}/findPassword/verification/update`,
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
