import { useRecoilState } from "recoil";
import { signupInfoState } from "@/stores/AuthStore";
import { SignupInfoTypes } from "@/components/auth/SignupFormRequired";

export const useChangeSignupInfo = () => {
  const [signupInfo, setSignupInfo] = useRecoilState(signupInfoState);

  const initalSignupInfo = {
    email: "",
    id: "",
    passwd: "",
    nickname: "",
    profileImage: "",
  };

  const changeSignupInfo = ({ key, value }: SignupInfoTypes) => {
    setSignupInfo({
      ...signupInfo,
      [key]: value,
    });
  };

  const resetSignupInfo = () => {
    setSignupInfo(initalSignupInfo);
  };

  return { changeSignupInfo, resetSignupInfo };
};
