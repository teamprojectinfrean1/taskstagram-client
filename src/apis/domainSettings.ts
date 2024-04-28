import axios from "axios";

const BASE_URL = "http://124.61.74.148:8080/api/v1";

const unauthorizedAxios = axios.create({
  baseURL: process.env.PUBLIC_URL,
});

const getAccessToken = () => {
  return sessionStorage.getItem("accessToken");
};

const authorizedAxios = axios.create({
  baseURL: process.env.PUBLIC_URL,
  headers: {
    Authorization: getAccessToken(),
  },
});

export { authorizedAxios, unauthorizedAxios };
