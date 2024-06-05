import { logoutPath } from "./userSettings";
import { authorizedAxios } from "../domainSettings";

export const fetchLogout = () => {
  sessionStorage.setItem('accessToken', "")
  return true
  // return true
  // refresh 토큰 구현되면 추후 작성할 예정
  // try {
  //   const response = authorizedAxios.get(`${logoutPath}`);
  // } catch (err) {}
};
