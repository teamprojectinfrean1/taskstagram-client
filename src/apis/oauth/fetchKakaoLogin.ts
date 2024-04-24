import { unauthorizedAxios } from "../domainSettings";
import { oauthPath } from "./oauthSettings";
import { jwtDecode } from "jwt-decode";

export const fetchKakaoLogin = async (code: any) => {
  try {
    const response = await unauthorizedAxios.get(`${oauthPath}/login/kakao?code=${code}`)
    console.log(response.data.data);
    const accessToken = response.data.data.Authorization[0]
    const decodedToken = jwtDecode(accessToken)
    const memberId = decodedToken.sub
    sessionStorage.setItem("accessToken", accessToken);
    return memberId
  } catch(err) {
    console.log(err);
  }
}