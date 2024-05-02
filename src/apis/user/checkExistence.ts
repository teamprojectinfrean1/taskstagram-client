import { unauthorizedAxios } from "../domainSettings";
import { checkMailPath, checkIdPath, checkNicknamePath } from "./userSettings";

// 이메일 중복검사
export const checkEmailExistence = async (email: string): Promise<boolean> => {
  try {
    const response = await unauthorizedAxios.get(`${checkMailPath}`, {
      params: { email },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// 아이디 중복검사
export const checkIdExistence = async (id: string): Promise<boolean> => {
  try {
    const response = await unauthorizedAxios.get(`${checkIdPath}`, {
      params: { id },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// 닉네임 중복검사
export const checkNicknameExistence = async (nickname: string): Promise<boolean> => {
  try {
    const response = await unauthorizedAxios.get(`${checkNicknamePath}`, {
      params: { nickname },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
