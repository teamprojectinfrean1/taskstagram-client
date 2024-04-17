import axios from "axios";

const oauthPath = "http://124.61.74.148:8080/api/v1/oauth"

export const fetchKakaoLogin = async (code: any) => {
  try {
    const response = await axios.get(`${oauthPath}/login/kakao?code=${code}`)
    console.log(response.data.data);
    const accessToken = response.data.data.Authorization[0]
    sessionStorage.setItem("accessToken", accessToken);
    return accessToken
  } catch(err) {
    console.log(err);
  }
}