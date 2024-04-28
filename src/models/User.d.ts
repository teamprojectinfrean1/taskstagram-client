export type UserInfo = {
  userId: string;
  email: string;
  id: string;
  nickname: string;
  profileImage: string;
};

export type UserSummary = {
  id: string;
  nickname: string;
  profileImage: string | null;
};
