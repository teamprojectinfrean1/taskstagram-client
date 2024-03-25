import axios from "axios";
import { BASE_URL } from "./domainSettings";
import { SignupInfo } from "@/models/Auth";

const authURL = `${BASE_URL}/auth`;

type fetchLoginParams = {
  email: string;
  password: string;
};

// 이메일 중복검사
export const checkEmailExistence = async (email: string) => {
  try {
    let response = null;
    response = await axios.get(`${authURL}/checkMail`, {
      params: { email },
    });
    if (response.data) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (err) {
    console.error(err);
  }
};

// 아이디 중복검사
export const checkIdExistence = async (id: string) => {
  try {
    let response = null;
    response = await axios.get(`${authURL}/checkId`, {
      params: id,
    });
    if (response.data) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (err) {
    console.error(err);
  }
};

// 닉네임 중복검사
export const checkNicknameExistence = async (nickname: string) => {
  try {
    let response = null;
    response = await axios.get(`${authURL}/checkNickname`, {
      params: nickname,
    });
    if (response.data) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (err) {
    console.error(err);
  }
};

// 회원가입 api
export const fetchSignup = async ({
  email,
  id,
  password,
  nickname,
  profileImage,
}: SignupInfo) => {
  try {
    let response = null;
    response = await axios.post(`${authURL}/join`, {
      email,
      id,
      password,
      nickname: nickname ? nickname : id,
      profileImage,
    });
    if (response) {
      return response.data;

    }
  } catch (err) {
    console.error(err);
  }

  return await axios
    .post(`${authURL}/join`, {
      email,
      id,
      password,
      nickname: nickname ? nickname : id,
      profileImage,
    })
    .then((res) => {
      // 백엔드에서 response 수정되면, 추후 res.data.data 로 변경 예정
      return res.data;
    });
};

// 로그인 api
export const fetchLogin = async ({ email, password }: fetchLoginParams) => {
  try {
    let response = null;
    response = await axios.post(`${authURL}/login`, {
      email,
      password,
    });
    if (response.data) {
      const accessToken = response.data;
      sessionStorage.setItem("accessToken", accessToken);
      console.log(response.data);
      return response.data;
    }
  } catch (err) {
    console.error(err);
  }
};

// 아이디 찾기 api (추후 구현할 예정)
// export const fetchEmailRegistered = async () => {
//   return await axios.get(`${authURL}/email/registered`, {
//     params: {
//       email: "aaa@naver.com"
//     }
//   }).then(res => {
//     console.log(res.data)
//   })
// }
