type NewOrUpdatedComment = {
  writerId: string;
  issueId: string;
  body: string;
};

type ExistingComment = {
  commentId: string;
  body: string;
  updatedAt: string;
  userId: string;
  userNickname: string;
  userProfileImage: string;
};
