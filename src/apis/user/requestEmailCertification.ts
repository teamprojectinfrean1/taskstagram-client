import { unauthorizedAxios } from "../domainSettings";
import { userPath } from "./userSettings";

export type EmailCertificationRequest = {
  findUserInfo: string;
  email: string;
};

// 이메일 인증 코드 요청 api(아이디 찾기, 비밀번호 찾기)
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
