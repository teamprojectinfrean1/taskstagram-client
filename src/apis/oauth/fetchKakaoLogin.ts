import axios from "axios";
import { unauthorizedAxios } from "../domainSettings";
import { oauthPath } from "./oauthSettings";
import { jwtDecode } from "jwt-decode";

export const fetchKakaoLogin = async (code: any) => {
  try {
    const response = await axios.get(`http://124.61.74.148:8080/api/v1/${oauthPath}/login/KAKAO?code=${code}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
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