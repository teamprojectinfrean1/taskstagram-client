import axios from "axios";
import { jwtDecode } from "jwt-decode";

const oauthPath = "http://124.61.74.148:8080/api/v1/oauth"

// export const fetchKakaoLogin = async (code: any) => {
//   try {
//     const response = await axios.get(`${oauthPath}/login/kakao?code=${code}`)
//     console.log(response.data.data);
//     const accessToken = response.data.data.Authorization[0]
//     const decodedToken = jwtDecode(accessToken)
//     const memberId = decodedToken.sub
//     sessionStorage.setItem("accessToken", accessToken);
//     return memberId
//   } catch(err) {
//     console.log(err);
//   }
// }