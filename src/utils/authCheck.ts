// 이메일 유효성 검사
const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
// 아이디 유효성 검사
const idRegEx = /^([a-z0-9]){5,20}$/;
// 비밀번호 유효성 검사
const passwordRegEx =
  /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/;
// 닉네임 유효성 검사
const nicknameRegEx = /^[^ㄱ-ㅎ]{2,20}$/;

type PasswordType = {
  password: string;
  passwordDouble: string;
};

// 회원가입 input 유효성 검사
export const checkAuthInputValidity = ({
  type,
  authValue,
}: CheckAuthInputValidity) => {
  switch (type) {
    case "email":
      return emailRegEx.test(authValue || "");
    case "id":
      return idRegEx.test(authValue || "");
    case "password":
      return passwordRegEx.test(authValue || "");
    case "nickname":
      return nicknameRegEx.test(authValue || "");

    default:
      return false;
  }
};

// 비밀번호 확인 검증
export const passwordDoubleCheck = ({
  password,
  passwordDouble,
}: PasswordType) => {
  return password === passwordDouble ? true : false;
};
