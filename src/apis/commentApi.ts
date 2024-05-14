import { authorizedAxios } from "./domainSettings";

const commentPath = "/comment";

type CreateCommentRequest = {
  comment: NewOrUpdatedComment;
};

type CreateCommentResponse = ExistingComment;

export const createComment = async ({
  comment,
}: CreateCommentRequest): Promise<CreateCommentResponse> => {
  try {
    const response = await authorizedAxios.post(commentPath, comment);
    return response.data.data;
  } catch (error) {
    throw new Error("댓글을 생성하는 중 오류가 발생했습니다.");
  }
};

type UpdateCommentRequest = {
  commentId: string;
  comment: NewOrUpdatedComment;
};

type UpdateCommentResponse = ExistingComment;

export const updateComment = async ({
  commentId,
  comment,
}: UpdateCommentRequest): Promise<UpdateCommentResponse> => {
  try {
    const response = await authorizedAxios.put(
      `${commentPath}/${commentId}`,
      comment
    );
    return response.data.data;
  } catch (error) {
    throw new Error("댓글을 업데이트하는 중 오류가 발생했습니다.");
  }
};

type GetCommentListRequest = {
  issueId: string;
  page: number;
  size: number;
};

export const getCommentList = async ({
  issueId,
  page,
  size
}: GetCommentListRequest): Promise<PaginatedResponse<ExistingComment>> => {
  try {
    const response = await authorizedAxios.get(
      `${commentPath}`,
      {
        params: {
          issueId,
          page,
          size,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("댓글 목록을 가져오는 중 오류가 발생했습니다.");
  }
};

type DeleteCommentRequest = {
  commentId: string;
};

type DeleteCommentResponse = {
  commentId: string;
};

export const deleteComment = async ({
  commentId,
}: DeleteCommentRequest): Promise<DeleteCommentResponse> => {
  try {
    const response = await authorizedAxios.delete(
      `${commentPath}/${commentId}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("댓글을 삭제하는 중 오류가 발생했습니다.");
  }
};
