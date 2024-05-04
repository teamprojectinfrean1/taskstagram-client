import { unauthorizedAxios } from "../domainSettings";
import { resetPasswordPath } from "./userSettings";

export type resetPasswordRequest = {
  memberId: string;
  password: string;
};

// 비밀번호 찾기(재설정) api
export const resetPassword = async ({
  memberId,
  password,
}: resetPasswordRequest) => {
  try {
    const response = await unauthorizedAxios.put(`${resetPasswordPath}`, {
      uuid: memberId,
      password,
    });
    return response.data.isSuccess;
  } catch (err) {
    console.error(err);
  }
};
