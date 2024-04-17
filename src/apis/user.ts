import { BASE_URL } from "./domainSettings";
import axios from "axios";

// const userURL = "http://124.61.74.148:8080/api/v1/users";
// const userURL = "http://14.33.239.204:8080/api/v1/users"
const userURL = "http:127.0.0.1:8080/api/v1/users"

type ChangeUserInfoRequest = {
  // userId : string,
  type: string,
  changeValue: object | string,
}

export const getUserInfo = async () => {
  let userInfo = null;
  try {
    const response = await axios.get(`${userURL}/token`, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    });
    if (response.data) {
      console.log(response.data);
      userInfo = response.data.data;
    }
    return userInfo;
  } catch (err) {
    console.error(err);
  }
};

export const changeUserInfo = async ({ type, value }: any) => {
  console.log(type, value);
  const data = {
    type,
    value
  }
  console.log(data);
  
  // const data = {
  //   type,
  //   value: {
  //     nickname: changeValue
  //   }
  // }
  // console.log(data);

  // try {
  //   const response = await axios.put(`${userURL}/update/?userId=${userId}`, {
  //     type,
  //     value
  //   });
  // } catch (err) {
  //   console.error(err);
  // }
};


export const changeProfileImage = (profileImage: File | null) => {
  console.log(profileImage);
}
