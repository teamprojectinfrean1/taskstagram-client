const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
const idRegEx = /^([a-z0-9]){5,20}$/;
const passwordRegEx =
  /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/;
const nicknameRegEx = /^[^ㄱ-ㅎ]{2,20}$/;

type PasswordType = {
  password: string;
  passwordDouble: string;
};

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

export const passwordDoubleCheck = ({
  password,
  passwordDouble,
}: PasswordType) => {
  return password === passwordDouble ? true : false;
};
