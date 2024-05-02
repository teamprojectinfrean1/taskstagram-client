import { authorizedAxios } from "../domainSettings";
import { userPath } from "./userSettings";

export type ChangeUserInfoRequest = {
  type: string;
  value: File | string | Object | null;
  memberId: string;
};

// 사용자 정보(닉네임, 비밀번호, 이메일) 변경 api
export const changeUserInfo = async ({
  type,
  value,
  memberId,
}: ChangeUserInfoRequest) => {
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
    } else {
      return response.data.isSuccess;
    }
  } catch (error) {
    throw error;
  }
};
