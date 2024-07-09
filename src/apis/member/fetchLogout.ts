import { authorizedAxios } from "../domainSettings";
import { logoutPath } from "./memberSettings";

export const fetchLogout = async () => {
  sessionStorage.setItem("accessToken", "");
  // try {
  //   const response = await authorizedAxios.get(`${logoutPath}`);
  //   console.log(response.data);
  // } catch (error) {
  //   throw error;
  // }
  return true
};
