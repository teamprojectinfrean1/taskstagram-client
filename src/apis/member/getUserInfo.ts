import { authorizedAxios } from "../domainSettings";
import { getUserInfoPath } from "./memberSettings";

// 사용자 정보 api
export const getUserInfo = async () => {
  try {
    const response = await authorizedAxios.get(`${getUserInfoPath}`, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
