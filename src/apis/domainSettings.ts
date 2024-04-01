import axios from "axios";

const BASE_URL = "http://1.246.104.170:8080/api/v1";

const unauthorizedAxios = axios.create({
  baseURL: BASE_URL,
});

const getAccessToken = () => {
  return sessionStorage.getItem("accessToken");
};

const authorizedAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: getAccessToken(),
  },
});

export { authorizedAxios, unauthorizedAxios };
