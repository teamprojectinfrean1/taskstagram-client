import { unauthorizedAxios } from "../domainSettings";
import { userPath } from "./userSettings";

type checkEmailVerificationRequest = {
  findUserInfo: string;
  email: string;
  verificationCode: string;
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
  } catch (error) {
    throw error
  }
};