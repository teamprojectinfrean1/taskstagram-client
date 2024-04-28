import axios from "axios";

const BASE_URL = "https://d2wzo46dl5rumb.cloudfront.net/api/v1/";

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
