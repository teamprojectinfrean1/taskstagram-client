import { unauthorizedAxios } from "./domainSettings";
import { authorizedAxios } from "./domainSettings";
import { jwtDecode } from "jwt-decode";

const userPath = "users"

export type ChangeProfileImageRequest = {
  profileImage: File | null;
  memberId: string;
};

export const changeProfileImage = async ({
  profileImage,
  memberId,
}: ChangeProfileImageRequest): Promise<string> => {
  const formData = new FormData();
  if (profileImage) {
    formData.append("multipartFile", profileImage);
  }
  try {
    const response = await authorizedAxios.put(
      `${userPath}/update/image?uuid=${memberId}`,
      formData
    );
    return response.data.data.updateURL;
  } catch (error) {
    throw error;
  }
};

export type ChangeUserInfoRequest = {
  type: string;
  value: string;
  memberId: string;
};

export const changeUserInfo = async ({
  type,
  value,
  memberId,
}: ChangeUserInfoRequest): Promise<string | undefined> => {
  try {
    const response = await authorizedAxios.put(
      `${userPath}/update?uuid=${memberId}`,
      {
        type,
        value,
      }
    );
    if (type === "email") {
      return response.data.data.email;
    } else if (type === "nickname") {
      return response.data.data.nickname;
    }
  } catch (error) {
    throw error;
  }
};

export type ChangeUserInfoPasswordRequest = {
  type: string;
  value: Object;
  memberId: string;
};

export const changeUserInfoPassword = async ({
  type,
  value,
  memberId,
}: ChangeUserInfoPasswordRequest): Promise<boolean> => {
  try {
    const response = await authorizedAxios.put(
      `${userPath}/update?uuid=${memberId}`,
      {
        type,
        value,
      }
    );
    return response.data.isSuccess;
  } catch (error) {
    throw error;
  }
};

export type CheckEmailVerificationRequest = {
  findUserInfo: string;
  email: string;
  verificationCode: string;
};

export type CheckFindIdEmailVerificationResponse = {
  id: string;
  nickname: string;
};

export type CheckFindPasswordEmailVerificationResponse = {
  memberUuid: string;
  userUuid: string;
};

export const checkEmailVerification = async ({
  findUserInfo,
  email,
  verificationCode,
}: CheckEmailVerificationRequest): Promise<
  | CheckFindIdEmailVerificationResponse
  | CheckFindPasswordEmailVerificationResponse
> => {
  try {
    const response = await unauthorizedAxios.post(
      `${userPath}/${findUserInfo}/verification/check`,
      {
        email,
        verificationCode,
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const checkEmailExistence = async (email: string): Promise<boolean> => {
  try {
    const response = await unauthorizedAxios.get(`${userPath}/checkMail`, {
      params: { email },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const checkIdExistence = async (id: string): Promise<boolean> => {
  try {
    const response = await unauthorizedAxios.get(`${userPath}/checkId`, {
      params: { id },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const checkNicknameExistence = async (nickname: string): Promise<boolean> => {
  try {
    const response = await unauthorizedAxios.get(`${userPath}/checkNickname`, {
      params: { nickname },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export type fetchLoginRequest = {
  id: string;
  password: string;
};

export const fetchLogin = async ({
  id,
  password,
}: fetchLoginRequest): Promise<string | undefined> => {
  try {
    const response = await unauthorizedAxios.post(
      `${userPath}/login`,
      {
        id,
        password,
      },
      {
        withCredentials: true,
      }
    );
    const accessToken = response.data.data.Authorization[0];
    const decodedToken = jwtDecode(accessToken);
    const memberId = decodedToken.sub;
    sessionStorage.setItem("accessToken", accessToken);
    return memberId;
  } catch (error) {
    throw error;
  }
};

export const fetchLogout = () => {
  sessionStorage.setItem('accessToken', "")
  return true
};

export const fetchSignup = async ({
  email,
  id,
  password,
  nickname,
  profileImage,
}: SignupInfo): Promise<string> => {
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
  } catch (error) {
    throw error
  }
};

export type EmailCertificationRequest = {
  findUserInfo: string;
  email: string;
};

export const requestEmailCertification = async ({
  findUserInfo,
  email,
}: EmailCertificationRequest): Promise<boolean> => {
  try {
    const response = await unauthorizedAxios.post(
      `${userPath}/${findUserInfo}/verification/request`,
      {
        email,
      }
    );
    return response.data.data.isSuccess;
  } catch (error) {
    throw error;
  }
};

export type resetPasswordRequest = {
  memberId: string;
  password: string;
};

export const resetPassword = async ({
  memberId,
  password,
}: resetPasswordRequest): Promise<boolean> => {
  try {
    const response = await unauthorizedAxios.put(`${userPath}/findPassword/verification/update`, {
      uuid: memberId,
      password,
    });
    return response.data.isSuccess;
  } catch (error) {
    throw error
  }
};