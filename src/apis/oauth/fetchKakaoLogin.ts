import { unauthorizedAxios } from "../domainSettings";
import { oauthLoginPath } from "./oauthSettings";
import { jwtDecode } from "jwt-decode";

export const fetchKakaoLogin = async (code: string | null): Promise<string | undefined> => {
  try {
    const response = await unauthorizedAxios.get(
      `${oauthLoginPath}/kakao?code=${code}`
    );
    const accessToken = response.data.data.Authorization[0];
    const decodedToken = jwtDecode(accessToken);
    const memberId = decodedToken.sub;
    sessionStorage.setItem("accessToken", accessToken);
    return memberId;
  } catch (error) {
    throw error;
  }
};
