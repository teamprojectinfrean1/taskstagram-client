import { useRecoilState, useResetRecoilState } from "recoil";
import { signupInfoState } from "@/stores/AuthStore";

export const useChangeSignupInfo = () => {
  const [signupInfo, setSignupInfo] = useRecoilState(signupInfoState);

  const changeSignupInfo = ({ key, value }: AuthInputValue) => {
    setSignupInfo({
      ...signupInfo,
      [key]: value,
    });
  };

  const resetSignupInfo = useResetRecoilState(signupInfoState);

  return { changeSignupInfo, resetSignupInfo };
};
