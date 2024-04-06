import { BASE_URL } from "./domainSettings";
import axios from "axios";

// const authURL = `${BASE_URL}/users`;
const userURL = "http://124.61.74.148:8080/api/v1/users";
// const authURL = "http://127.0.0.1:8080/api/v1/users"

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