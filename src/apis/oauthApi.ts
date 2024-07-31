import { unauthorizedAxios } from "./domainSettings";
import { jwtDecode } from "jwt-decode";

export const oauthPath = "oauth";

export const fetchKakaoLogin = async (
  code: string | null
): Promise<string | undefined> => {
  try {
    const response = await unauthorizedAxios.get(
      `${oauthPath}/login/kakao?code=${code}`
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
