import axios from "axios";
import { AuthInputValueType, SignupInfoType } from "@/models/Auth";

// 이메일 유효성 검사
const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
// 아이디 유효성 검사
const idRegEx = /^.{5,20}$/;
// 비밀번호 유효성 검사
const passwordRegEx =
  /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,32}$/;
// 닉네임 유효성 검사
const nicknameRegEx = /^[^ㄱ-ㅎ]{2,20}$/;

// // 휴대폰 유효성 검사
// const phoneNumberRegEx = /^[0-9]{11}$/;

type PasswdType = {
  passwd: string;
  passwdDouble: string;
};

export const checkAuthInputValidity = ({
  type,
  authValue,
}: AuthInputValueType) => {
  switch (type) {
    case "email":
      return emailRegEx.test(authValue || "");
    case "id":
      return idRegEx.test(authValue || "");
    case "passwd":
      return passwordRegEx.test(authValue || "");
    case "nickname":
      return nicknameRegEx.test(authValue || "");

    default:
      return false;
  }
};

export const passwdDoubleCheck = ({ passwd, passwdDouble }: PasswdType) => {
  return passwd === passwdDouble ? true : false;
};

// 이메일, 아이디, 닉네임 중복검사
export const fetchDupicate = ({ type, authValue }: AuthInputValueType) => {
  let url;
  switch (type) {
    case "email":
      url = "http://1.246.104.170:8080/api/v1/user/checkMail";
      return axios
        .get(url, {
          params: {
            email: authValue,
          },
        })
        .then((res) => {
          return res.data;
        });
    case "id":
      url = "http://1.246.104.170:8080/api/v1/user/checkId";
      return axios
        .get(url, {
          params: {
            id: authValue,
          },
        })
        .then((res) => {
          return res.data;
        });
    case "nickname":
      return true;
  }
};

export const fetchLogin = () => {
  const url = "http://1.246.104.170:8080/api/v1/auth/login";
  axios
    .post(url, {
      email: "aaa@naver.com",
      password: "Q!W@E#R$",
    })
    .then((res) => {
      console.log(res.data);
    });
  return false;
};

export const fetchSignup = ({email, id, passwd, nickname, profileImage}: SignupInfoType) => {
  // const test = {
  //   email,
  //   id,
  //   passwd,
  //   profileImage,
  //   nickname: nickname? nickname : id
  // }
  console.log(email, id, passwd, nickname, profileImage)
  // const url = "http://1.246.104.170:8080/api/v1/user/join"
}
