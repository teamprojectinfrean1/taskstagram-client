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
// 인증 번호 검사
const phoneCertifiRegEx = /^[0-9]{6}$/;

interface PasswdType {
  passwd: string;
  passwdDouble: string;
}

interface AuthType extends PasswdType {
  email: string;
}

interface effectType {
  type: string;
  email?: string;
  passwd?: string;
  nickname?: string;
  phoneNumber?: string;
  phoneCertifi?: string;
}

export const effectCheck = (props: effectType) => {
  switch (props.type) {
    case "email":
      return emailRegEx.test(props.email || "");
    case "passwd":
      return passwordRegEx.test(props.passwd || "");
    case "nickname":
      if (props.nickname) {
        const nicknameLength = props.nickname.length;
        return nicknameLength >= 2 && nicknameLength <= 10 && !koreanInitialRegEx ? true : false;
      } else {
        return false;
      }
    case "phoneNumber":
      return phoneNumberRegEx.test(props.phoneNumber || "")
    
    // case "phoneCertifi":
    //   return phoneCertifiRegEx.test(props.phoneCertifi || "")

    default:
      return false;
  }
};

export const phoneNumberDoubleCheck = (phoneCertifi: string) => {
  return  phoneCertifi.length === 6 ? true : false
}

// export const passwdCheck = (passwd: string) => {
//   return passwordRegEx.test(passwd);
// };

export const passwdDoubleCheck = ({ passwd, passwdDouble }: PasswdType) => {
  return passwd === passwdDouble ? true : false;
};

export const apiAuthTest = ({ email, passwd, passwdDouble }: AuthType) => {
  console.log(email, passwd, passwdDouble);
};
