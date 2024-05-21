import { unauthorizedAxios } from "../domainSettings";
import { userPath } from "./userSettings";

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

// 이메일 인증 코드 확인 api(아이디 찾기, 비밀번호 찾기)
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
