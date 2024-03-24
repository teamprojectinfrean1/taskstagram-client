import { useRecoilState } from "recoil";
import { signupInfoState } from "@/stores/AuthStore";
import { SignupInputValueTypes } from "@/models/Auth";

export const useChangeSignupInfo = () => {
  const [signupInfo, setSignupInfo] = useRecoilState(signupInfoState);

  const initalSignupInfo = {
    email: "",
    id: "",
    password: "",
    nickname: "",
    profileImage: "",
  };

  const changeSignupInfo = ({ key, value }: SignupInputValueTypes) => {
    setSignupInfo({
      ...signupInfo,
      [key]: value,
    });
  };
  {/*헬로*/}
  const resetSignupInfo = () => {
    setSignupInfo(initalSignupInfo);
  };

  return { changeSignupInfo, resetSignupInfo };
};
