import { BASE_URL } from "./domainSettings";
import axios from "axios";

const userURL = `${BASE_URL}/users`;

export const getUserInfo = async () => {
  let userInfo = null;
  try {
    const response = await axios.get(`${userURL}/token`, {
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