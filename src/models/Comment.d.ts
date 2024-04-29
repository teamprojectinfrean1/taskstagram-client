type NewOrUpdatedComment = {
  writerId: string;
  issueId: string;
  commentBody: string;
};

type ExistingComment = {
  commentId: string;
  commentBody: string;
  lastModifiedDate: string;
  userId: string;
  userNickname: string;
  userProfileImage: string;
};
