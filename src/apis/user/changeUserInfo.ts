import { authorizedAxios } from "../domainSettings";
import { userPath } from "./userSettings";

type ChangeUserInfoRequest = {
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
  } catch (error) {
    throw error
  }
};