import axios from "axios";
import { BASE_URL } from "./domainSettings";
import { SignupInfo } from "@/models/Auth";

// const authURL = `${BASE_URL}/auth`;
const authURL = "http://124.61.74.148:8080/api/v1/auth";

type fetchLoginParams = {
  email: string;
  password: string;
};

// 이메일 중복검사
export const checkEmailExistence = async (email: string) => {
  try {
    let response = null;
    response = await axios.get(`${authURL}/checkMail`, {
      params: { email },
    });
    if (response.data) {
      console.log(response.data);
      return response.data.data;
    }
  } catch (err) {
    console.error(err);
  }
};

// 아이디 중복검사
export const checkIdExistence = async (id: string) => {
  try {
    let response = null;
    response = await axios.get(`${authURL}/checkId`, {
      params: { id },
    });
    if (response.data) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (err) {
    console.error(err);
  }
};

// 닉네임 중복검사
export const checkNicknameExistence = async (nickname: string) => {
  try {
    let response = null;
    response = await axios.get(`${authURL}/checkNickname`, {
      params: { nickname },
    });
    if (response.data) {
      console.log(response.data.data);
      return response.data.data;
    }
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
    let response = null;
    response = await axios.post(`${authURL}/join`, {
      email,
      id,
      password,
      nickname: nickname ? nickname : id,
      profileImage,
    });
    if (response) {
      // 백엔드에서 response 수정되면, 추후 res.data.data 로 변경 예정
      return response.data;
    }
  } catch (err) {
    console.error(err);
  }
};

// 로그인 api
export const fetchLogin = async ({ email, password }: fetchLoginParams) => {
  try {
    let response = null;
    response = await axios.post(`${authURL}/login`, {
      email,
      password,
    });
    if (response.data) {
      const accessToken = response.data;
      sessionStorage.setItem("accessToken", accessToken);
      return response.data;
    }
  } catch (err) {
    console.error(err);
  }
};

// 아이디 찾기 이메일 인증 코드 요청 api
export const requestEmailVerification = async ({
  findUserInfo,
  email,
}: any) => {
  try {
    let isSuccess = null;
    const response = await axios.post(
      `${authURL}/${findUserInfo}/verification/request`,
      {
        email,
      }
    );
    if (response.data.data) {
      isSuccess = response.data.data.isSuccess;
    }
    return isSuccess;
  } catch (err) {
    console.error(err);
  }
};

// 패스워드 찾기 이메일 인증 코드 확인 api
export const checkEmailVerification = async ({
  findUserInfo,
  email,
  verificationCode,
}: any) => {
  console.log(findUserInfo, email, verificationCode);
  try {
    let data = null;
    const response = await axios.post(`${authURL}/${findUserInfo}/verification/check`, {
      email,
      verificationCode,
    });
    if (response.data) {
      data = response.data.data;
      // userId = response.data.data
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = async ({userId, password}: any) => {
  try {
    let isSuccess = null
    const response = await axios.put(`${authURL}/findPassword/verification/update`, {
      uuid : userId,
      password
    })
    if (response.data) {
      isSuccess = true
    }
    return isSuccess
  } catch(err) {
    console.error(err);
    
  }
}
