import { authorizedAxios } from "../domainSettings";
import { getUserInfoPath } from "./memberSettings";

type GetUserInfoResponse = {
  userOauthUuid: string,
  id: string,
  nickname: string,
  email: string,
  profileImage: string,
  weaver: boolean
}

// 사용자 정보 api
export const getUserInfo = async (): Promise<GetUserInfoResponse | undefined> => {
  try {
    const response = await authorizedAxios.get(`${getUserInfoPath}`, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    });
    return response.data.data;
  } catch (error) {
    throw error
  }
};
