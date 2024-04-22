import axios from "axios";
import { authorizedAxios, unauthorizedAxios } from "./domainSettings";
import { Cookies } from "react-cookie";

const memberPath = "member";
// const memberPath = "http://127.0.0.1:8080/api/v1/member"

export const getUserInfo = async () => {
  try {
    const response = await authorizedAxios.get(`${memberPath}/token`, {
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

export const reissueCheck = async (loginType: string) => {
  const cookies = new Cookies();
  console.log(cookies.get("refreshToken"), loginType);

  // const refreshToken = cookies.get("refreshToken");
  
  try {
    const response = await authorizedAxios.get(
      `${memberPath}/reissue?loginType=${loginType}`
    );
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};
