import axios from "axios";
import { BASE_URL } from "./domainSettings";
import { SignupInfoType } from "@/models/Auth";

const authURL = `${BASE_URL}/auth`;

type fetchEmailDupicateProps = {
  email: string;
  setEmailErrorMessage(value: string): void;
  setEmailErrorState(value: boolean): void;
};

// 이메일 중복검사
export const fetchEmailDupicate = async ({
  email,
  setEmailErrorMessage,
  setEmailErrorState,
}: fetchEmailDupicateProps) => {
  const response = await axios
    .get(`${authURL}/checkMail`, {
      params: {
        email,
      },
    })
    .then((res) => {
      return res.data.data;
    });
  if (!response) {
    setEmailErrorMessage(
      "이미 가입된 이메일입니다. 다른 이메일을 입력해주세요."
    );
    setEmailErrorState(true);
  }
  return response;
};

type fetchIdDupicateProps = {
  id: string;
  setIdErrorMessage(value: string): void;
  setIdErrorState(value: boolean): void;
};

// 아이디 중복검사
export const fetchIdDupicate = async ({
  id,
  setIdErrorMessage,
  setIdErrorState,
}: fetchIdDupicateProps) => {
  const response = await axios
    .get(`${authURL}/checkId`, {
      params: {
        id,
      },
    })
    .then((res) => {
      return res.data.data;
    });
  if (!response) {
    setIdErrorMessage(
      "이미 가입된 아이디입니다. 다른 아이디를 입력해주세요."
    );
    setIdErrorState(true);
  }

  return response;
};

type fetchNicknameDupicateProps = {
  nickname: string;
  setNicknameErrorMessage(value: string): void;
  setNicknameErrorState(value: boolean): void;
};

// 닉네임 중복검사
export const fetchNicknameDupicate = async ({
  nickname,
  setNicknameErrorMessage,
  setNicknameErrorState,
}: fetchNicknameDupicateProps) => {
  const response = await axios
    .get(`${authURL}/checkNickname`, {
      params: {
        nickname,
      },
    })
    .then((res) => {
      return res.data.data;
    });
  if (!response) {
    setNicknameErrorMessage(
      "이미 가입된 닉네임입니다. 다른 닉네임를 입력해주세요."
    );
    setNicknameErrorState(true);
  }

  return response;
};

// 회원가입 api
export const fetchSignup = async ({
  email,
  id,
  password,
  nickname,
  profileImage,
}: SignupInfoType) => {
  return await axios
    // api -> `${authURL}/join` 로 변경 예정
    .post(`${BASE_URL}/users/join`, {
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

type fetchLoginProps = {
  email: string;
  password: string;
  setShowModal(value: boolean): void;
  setIsSuccess(value: boolean): void;
};

// 로그인 api
export const fetchLogin = async ({
  email,
  password,
  setShowModal,
  setIsSuccess,
}: fetchLoginProps) => {
  const response = await axios
    .post(`${authURL}/login`, {
      email,
      password,
    })
    .then((res) => {
      // accessToken = res.data.data로 바꿀 예정
      const accessToken = res.data;
      sessionStorage.setItem("accessToken", accessToken);
      return res.data;
    });
    
  if (!response) {
    setShowModal(true);
    setIsSuccess(response);
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
