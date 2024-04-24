import { unauthorizedAxios } from "./domainSettings";

const userPath = "/users";

export const getUserInfo = async () => {
  let userInfo = null;
  try {
    const response = await unauthorizedAxios.get(`${userPath}/token`, {
      headers: {
        Authorization: sessionStorage.getItem('accessToken')
      }
    });
    if (response.data) {
      userInfo = response.data.data
    }
    return userInfo
  } catch (err) {
    console.error(err);
  }
};