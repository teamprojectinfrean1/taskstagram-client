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
    console.log(response.data);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};
