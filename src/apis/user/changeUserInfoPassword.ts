import { authorizedAxios } from "../domainSettings";
import { userPath } from "./userSettings";

export type ChangeUserInfoPasswordRequest = {
  type: string;
  value: Object;
  memberId: string;
};

export const changeUserInfoPassword = async ({
  type,
  value,
  memberId,
}: ChangeUserInfoPasswordRequest): Promise<boolean> => {
  try {
    const response = await authorizedAxios.put(
      `${userPath}/update?uuid=${memberId}`,
      {
        type,
        value,
      }
    );
    return response.data.isSuccess;
  } catch (error) {
    throw error;
  }
};
