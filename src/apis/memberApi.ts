import axios from "axios";

const memberPath = "http://124.61.74.148:8080/api/v1/member";
// const memberPath = "http://127.0.0.1:8080/api/v1/member"

export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${memberPath}/token`, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    });
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};
