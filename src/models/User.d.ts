type UserInfo = {
  userId: string;
  memberId: string;
  email: string;
  id: string;
  nickname: string;
  profileImage: string | null;
  weaver: boolean | null;
};

type UserSummary = {
  id: string;
  memberId: string;
  nickname: string;
  profileImage: string | null;
};

type User = {
  memberUuid: string;
  userUuid: string;
  nickname: string | null;
  profileUrl: string | null;
};