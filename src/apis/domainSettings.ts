import axios from "axios";

const BASE_URL = "http://1.246.104.170:8080/api/v1"

const getAccessToken = () => {
// 세션 스토리지에서 access token 가져오기
  return ; 
}

const baseAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `${getAccessToken()}`,
  },
});


export default baseAxios;