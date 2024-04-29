import { authorizedAxios } from "../domainSettings";
import { userPath } from "./userSettings";

type imageType = {
  profileImage: File | null;
  memberId: string;
};

// 사용자 프로필 이미지 변경 api
export const changeProfileImage = async ({
  profileImage,
  memberId,
}: imageType) => {
  // console.log(profileImage, memberId);
  const formData = new FormData();
  if (profileImage) {
    formData.append("multipartFile", profileImage);
  }
  try {
    const response = await authorizedAxios.put(
      `${userPath}/update/image?uuid=${memberId}`,
      formData
    );
    console.log(response.data);
    return response.data.data.updateURL;
  } catch (err) {
    if (err instanceof Error) {
      throw err.message;
    }
  }
};