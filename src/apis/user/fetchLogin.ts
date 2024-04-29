// 로그인 api
import { unauthorizedAxios } from "../domainSettings";
import { loginPath } from "./userSettings";
import { jwtDecode } from "jwt-decode";

type fetchLoginRequest = {
  id: string;
  password: string;
};

export const fetchLogin = async ({
  id,
  password,
}: fetchLoginRequest): Promise<string | undefined> => {
  try {
    const response = await unauthorizedAxios.post(`${loginPath}`, {
      id,
      password,
    });

    const accessToken = response.data.data.Authorization[0];
    const decodedToken = jwtDecode(accessToken);
    const memberId = decodedToken.sub;
    sessionStorage.setItem("accessToken", accessToken);
    return memberId;
  } catch (error) {
    throw error;
  }
};
