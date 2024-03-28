import { useRecoilState, useResetRecoilState } from "recoil";
import { signupInfoState } from "@/stores/authStore";
import { SignupInputValue } from "@/models/Auth";

export const useChangeSignupInfo = () => {
  const [signupInfo, setSignupInfo] = useRecoilState(signupInfoState);

  const changeSignupInfo = ({ key, value }: SignupInputValue) => {
    setSignupInfo({
      ...signupInfo,
      [key]: value,
    });
  };

  const resetSignupInfo = useResetRecoilState(signupInfoState);

  return { changeSignupInfo, resetSignupInfo };
};
