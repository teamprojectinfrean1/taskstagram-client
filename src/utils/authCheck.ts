const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
const passwordRegEx =
  /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,32}$/;

interface PasswdType {
  passwd: string;
  passwdDouble: string;
}

interface AuthType extends PasswdType {
  email: string;
}

export const emailCheck = (email: string) => {
  return emailRegEx.test(email);
};

export const passwdCheck = (passwd: string) => {
  return passwordRegEx.test(passwd);
};

export const passwdDoubleCheck = ({ passwd, passwdDouble }: PasswdType) => {
  return passwd === passwdDouble ? true : false;
};

export const apiAuthTest = ({ email, passwd, passwdDouble }: AuthType) => {
  console.log(email, passwd, passwdDouble);
};
