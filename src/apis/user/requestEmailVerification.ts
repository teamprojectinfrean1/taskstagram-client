import { unauthorizedAxios } from "../domainSettings";
import { userPath } from "./userSettings";

type requestEmailVerificationRequest = {
  findUserInfo: string;
  email: string;
};

// 이메일 인증 코드 요청 api(아이디 찾기, 비밀번호 찾기)
export const requestEmailVerification = async ({
  findUserInfo,
  email,
}: requestEmailVerificationRequest): Promise<boolean> => {
  try {
    const response = await unauthorizedAxios.post(
      `${userPath}/${findUserInfo}/verification/request`,
      {
        email,
      }
    );
    console.log(response.data.data.isSuccess);
    return response.data.data.isSuccess;
  } catch (error) {
    throw error;
  }
};
