import { unauthorizedAxios } from "../domainSettings";
import { SignupInfo } from "@/models/Auth";
import { signupPath } from "./userSettings";

// 회원가입 api
export const fetchSignup = async ({
  email,
  id,
  password,
  nickname,
  profileImage,
}: SignupInfo): Promise<string> => {
  const formData = new FormData();
  nickname = nickname ? nickname : id;
  formData.append(
    "requestCreateUser",
    new Blob([JSON.stringify({ id, nickname, email, password })], {
      type: "application/json",
    })
  );
  if (profileImage) {
    formData.append("multipartFile", profileImage);
  }
  try {
    const response = await unauthorizedAxios.post(`${signupPath}`, formData);
    return response.data.data.nickname;
  } catch (error) {
    throw error
  }
};
