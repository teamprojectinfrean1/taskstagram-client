import axios from "axios";

const BASE_URL = "https://d2wzo46dl5rumb.cloudfront.net/";

const unauthorizedAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

unauthorizedAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      throw error.response.status
    } else {
      throw error.message
    }
  }
);

const getAccessToken = () => {
  return sessionStorage.getItem("accessToken");
};

const authorizedAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: getAccessToken(),
  },
  withCredentials: true,
});

authorizedAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      throw error.response.status
    } else {
      throw error.message
    }
  }
);

export { authorizedAxios, unauthorizedAxios };
