// 이메일 유효성 검사
const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
// 비밀번호 유효성 검사
const passwordRegEx =
  /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,32}$/;
// 닉네임 초성 방지 유효성 검사
const koreanInitialRegEx = /^[ㄱ-ㅎ]/;
// 휴대폰 유효성 검사
const phoneNumberRegEx = /^[0-9]{11}$/;

type PasswdType = {
  passwd: string;
  passwdDouble: string;
}

type SignupInfoType = { 
  email: string;
  passwd: string;
  passwdDouble: string;
  nickname: string;
  phoneNumber: string;
  phoneCertifi: string;
}

type AuthInputValueType = {
  type: string;
  authValue: string;
}

export const checkAuthInputValidity = ({type, authValue}: AuthInputValueType) => {
  switch (type) {
    case "email":
      return emailRegEx.test(authValue || "");
    case "passwd":
      return passwordRegEx.test(authValue || "");
    case "nickname":
      if (authValue) {
        const nicknameLength = authValue.length;
        return nicknameLength >= 2 && nicknameLength <= 10 && !koreanInitialRegEx.test(authValue || "") ? true : false;
      } else {
        return false;
      }
    case "phoneNumber":
      return phoneNumberRegEx.test(authValue || "")
  
    default:
      return false;
  }
};

export const passwdDoubleCheck = ({ passwd, passwdDouble }: PasswdType) => {
  return passwd === passwdDouble ? true : false;
};

export const phoneCertifiCheck = (phoneCertifi: string) => {
  // 추후 백엔드 측에서 문자 인증 구현 완료 되면 변경해야함.
  const temporCertifiNumber = '123456'
  return phoneCertifi === temporCertifiNumber? true : false
}

export const apiAuthTest = (signupInfo: SignupInfoType) => {
  // 추후 백엔드에 회원가입 정보를 넘겨주고, 응답에 따라 기능을 변경해야함.
  const sendApi = true
  return sendApi
};
