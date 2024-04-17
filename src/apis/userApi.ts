import axios from "axios";
import { authorizedAxios, unauthorizedAxios } from "./domainSettings";
import { IssueStory } from "@/models/Issue";
import { SignupInfo } from "@/models/Auth";

const userPath = "http://124.61.74.148:8080/api/v1/users";

type UserStoryListRequest = {
  projectId: string;
  page: number;
};

type UserStoryListResponse = {
  dataList: IssueStory[];
  hasMore: boolean;
};

export const getUserStoryList = async ({
  projectId,
  page,
}: UserStoryListRequest): Promise<UserStoryListResponse> => {
  const USER_PER_PAGE = 15;

  try {
    const response = await authorizedAxios.post(
      `${userPath}/project/user-list`,
      {
        projectId,
        USER_PER_PAGE,
        page,
      }
    );
    const data = response.data;
    return { dataList: data.data, hasMore: data.hasMore };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

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
    const response = await axios.get(`${userPath}/checkMail`, {
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
    const response = await axios.get(`${userPath}/checkId`, {
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
    const response = await axios.get(`${userPath}/checkNickname`, {
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
  nickname = nickname ? nickname : id;
  formData.append(
    "requestCreateUser",
    new Blob([JSON.stringify({ id, nickname, email, password })], {
      type: "application/json",
    })
  );
  if (profileImage) {
    formData.append("multipartFile", profileImage);
  }
  try {
    const response = await axios.post(`${userPath}/join`, formData);
    return response.data.data.nickname;
  } catch (err) {
    return false;
  }
};

// 로그인 api
export const fetchLogin = async ({ id, password }: fetchLoginRequest) => {
  try {
    const response = await axios.post(`${userPath}/login`, {
      id,
      password,
    });
    const accessToken = response.data.data.Authorization;
    sessionStorage.setItem("accessToken", accessToken);
    return response.data.data.Authorization;
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
    const response = await axios.post(
      `${userPath}/${findUserInfo}/verification/request`,
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
      `${userPath}/${findUserInfo}/verification/check`,
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

export const resetPassword = async ({
  userId,
  password,
}: resetPasswordRequest) => {
  try {
    let isSuccess = null;
    const response = await axios.put(
      `${userPath}/findPassword/verification/update`,
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

export const getUserInfo = async () => {
  let userInfo = null;
  try {
    const response = await unauthorizedAxios.get(`${userPath}/token`, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    });
    if (response.data) {
      userInfo = response.data.data;
    }
    return userInfo;
  } catch (err) {
    console.error(err);
  }
};
