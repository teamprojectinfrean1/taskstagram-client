const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
const passwordRegEx =
  /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,32}$/;

export const emailCheck = (email: string) => {
  return emailRegEx.test(email);
};

export const passwdCheck = (passwd: string) => {
  return passwordRegEx.test(passwd);
};

interface propsType {
  passwd: string;
  passwdDouble: string;
}

export const passwdDoubleCheck = ({ passwd, passwdDouble }: propsType) => {
  return passwd === passwdDouble ? true : false;
};
