import axios from "axios";

const BASE_URL = "http://124.61.74.148:8080/api/v1/";

const unauthorizedAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const getAccessToken = () => {
  return sessionStorage.getItem("accessToken");
};

const authorizedAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: getAccessToken(),
  },
  withCredentials: true
});

// authorizedAxios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     console.error(error);
//   }
// );

export { authorizedAxios, unauthorizedAxios };
