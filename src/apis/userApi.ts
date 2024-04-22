import axios from "axios";
import { authorizedAxios, unauthorizedAxios } from "./domainSettings";
import { IssueStory } from "@/models/Issue";
import { SignupInfo } from "@/models/Auth";
import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";

// type ErrorRespone = {
//   code: string;
//   message: string;
//   name: string;
// };

const userPath = "users";
// const userPath = "http://127.0.0.1:8080/api/v1/users"

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

export type ChangeUserInfo = {
  type: string;
  value: File | string | Object | null;
  memberId: string;
};

// 이메일 중복검사
export const checkEmailExistence = async (email: string) => {
  try {
    const response = await unauthorizedAxios.get(`${userPath}/checkMail`, {
      params: { email },
    });
    console.log(response.data);
    return response.data.data;
  } catch (err) {
    if (err instanceof Error) {
      throw err.message;
    }
  }
};

// 아이디 중복검사
export const checkIdExistence = async (id: string) => {
  try {
    const response = await unauthorizedAxios.get(`${userPath}/checkId`, {
      params: { id },
    });
    return response.data.data;
  } catch (err) {
    if (err instanceof Error) {
      throw err.message;
    }
  }
};

// 닉네임 중복검사
export const checkNicknameExistence = async (nickname: string) => {
  try {
    const response = await unauthorizedAxios.get(`${userPath}/checkNickname`, {
      params: { nickname },
    });
    return response.data.data;
  } catch (err) {
    if (err instanceof Error) {
      throw err.message;
    }
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
    const response = await unauthorizedAxios.post(`${userPath}/join`, formData);
    return response.data.data.nickname;
  } catch (err) {
    if (err instanceof Error) {
      throw err.message;
    }
  }
};

// 로그인 api
export const fetchLogin = async ({ id, password }: fetchLoginRequest) => {
  try {
    const response = await unauthorizedAxios.post(`${userPath}/login`, {
      id,
      password,
    });

    const accessToken = response.data.data.Authorization[0];
    const decodedToken = jwtDecode(accessToken);
    const memberId = decodedToken.sub;
    sessionStorage.setItem("accessToken", accessToken);

    return memberId;
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "Request failed with status code 400") {
        return "Bad Request";
      } else if (err.message === "Network Error") {
        throw "Network Error";
      }
    }
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
      `${userPath}/${findUserInfo}/verification/request`,
      {
        email,
      }
    );
    return response.data.data.isSuccess;
  } catch (err) {
    if (err instanceof Error) {
      throw err.message;
    }
  }
};

// 이메일 인증 코드 확인 api(아이디 찾기, 비밀번호 찾기)
export const checkEmailVerification = async ({
  findUserInfo,
  email,
  verificationCode,
}: checkEmailVerificationRequest) => {
  try {
    const response = await unauthorizedAxios.post(
      `${userPath}/${findUserInfo}/verification/check`,
      {
        email,
        verificationCode,
      }
    );
    console.log(response.data);
    return response.data.data;
  } catch (err) {
    if (err instanceof Error) {
      throw err.message;
    }
  }
};

// 비밀번호 찾기(재설정) api
export const resetPassword = async ({
  userId,
  password,
}: resetPasswordRequest) => {
  try {
    let isSuccess = null;
    const response = await unauthorizedAxios.put(
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

// 사용자 정보(닉네임, 비밀번호, 이메일) 변경 api
export const changeUserInfo = async ({
  type,
  value,
  memberId,
}: ChangeUserInfo) => {
  console.log(type, value, memberId);

  try {
    const response = await authorizedAxios.put(
      `${userPath}/update?uuid=${memberId}`,
      {
        type,
        value,
      }
    );
    console.log(response.data);
    return response.data.data.nickname;
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return err.message;
    }
  }
};

type imageType = {
  profileImage: File | null;
  memberId: string;
};

// 사용자 프로필 이미지 변경 api
export const changeUserInfoImage = async ({
  profileImage,
  memberId,
}: imageType) => {
  // console.log(profileImage, memberId);
  const formData = new FormData();
  if (profileImage) {
    formData.append("multipartFile", profileImage);
  }
  try {
    const response = await authorizedAxios.put(
      `${userPath}/update/image?uuid=${memberId}`,
      formData
    );
    console.log(response.data);
    return response.data.data.updateURL;
  } catch (err) {
    if (err instanceof Error) {
      throw err.message;
    }
  }
};
