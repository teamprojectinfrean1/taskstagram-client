import axios from "axios";
import { BASE_URL } from "./domainSettings";
import { SignupInfoType } from "@/models/Auth";

const authURL = `${BASE_URL}/auth`;

type fetchEmailDupicateProps = {
  email: string;
  setEmailErrorMessage(message: string): void;
  setEmailErrorState(errorState: boolean): void;
};

type fetchIdDupicateProps = {
  id: string;
  setIdErrorMessage(message: string): void;
  setIdErrorState(errorState: boolean): void;
};

type fetchNicknameDupicateProps = {
  nickname: string;
  setNicknameErrorMessage(message: string): void;
  setNicknameErrorState(errorState: boolean): void;
};

type fetchLoginProps = {
  email: string;
  password: string;
  setShowModal(value: boolean): void;
  setIsSuccess(isSuccess: boolean): void;
};

// 이메일 중복검사
export const fetchEmailDupicate = async ({
  email,
  setEmailErrorMessage,
  setEmailErrorState,
}: fetchEmailDupicateProps) => {
  let response = null;
  response = await axios
    .get(`${authURL}/checkMail`, {
      params: {
        email,
      },
    })
    .then((res) => {
      if (res.data) {
        return res.data.data;
      }
    });

  if (!response) {
    setEmailErrorMessage(
      "이미 가입된 이메일입니다. 다른 이메일을 입력해주세요."
    );
    setEmailErrorState(true);
  }

  return response;
};

// 아이디 중복검사
export const fetchIdDupicate = async ({
  id,
  setIdErrorMessage,
  setIdErrorState,
}: fetchIdDupicateProps) => {
  let response = null;
  response = await axios
    .get(`${authURL}/checkId`, {
      params: {
        id,
      },
    })
    .then((res) => {
      if (res.data) {
        return res.data.data;
      }
    });

  if (!response) {
    setIdErrorMessage("이미 가입된 아이디입니다. 다른 아이디를 입력해주세요.");
    setIdErrorState(true);
  }

  return response;
};

// 닉네임 중복검사
export const fetchNicknameDupicate = async ({
  nickname,
  setNicknameErrorMessage,
  setNicknameErrorState,
}: fetchNicknameDupicateProps) => {
  let response = null;
  response = await axios
    .get(`${authURL}/checkNickname`, {
      params: {
        nickname,
      },
    })
    .then((res) => {
      if (res.data) {
        return res.data.data;
      }
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
