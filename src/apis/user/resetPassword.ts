import { unauthorizedAxios } from "../domainSettings";
import { resetPasswordPath } from "./userSettings";

export type resetPasswordRequest = {
  userId: string;
  password: string;
};

// 비밀번호 찾기(재설정) api
export const resetPassword = async ({
  userId,
  password,
}: resetPasswordRequest) => {
  try {
    let isSuccess = null;
    const response = await unauthorizedAxios.put(`${resetPasswordPath}`, {
      uuid: userId,
      password,
    });
    if (response.data) {
      console.log(response.data);
      isSuccess = true;
    }
    return isSuccess;
  } catch (err) {
    console.error(err);
  }
};
