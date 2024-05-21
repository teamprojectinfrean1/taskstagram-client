import { authorizedAxios } from "../domainSettings";
import { userPath } from "./userSettings";

export type ChangeProfileImageRequest = {
  profileImage: File | null;
  memberId: string;
};

// 사용자 프로필 이미지 변경 api
export const changeProfileImage = async ({
  profileImage,
  memberId,
}: ChangeProfileImageRequest): Promise<string> => {
  const formData = new FormData();
  if (profileImage) {
    formData.append("multipartFile", profileImage);
  }
  try {
    const response = await authorizedAxios.put(
      `${userPath}/update/image?uuid=${memberId}`,
      formData
    );
    return response.data.data.updateURL;
  } catch (error) {
    throw error;
  }
};
