import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import { useMutation, useQueryClient } from "react-query";
import { createComment } from "@/apis/commentApi";
import { PrimaryButton, Spinner, UserAvatar } from "@/components";
import { Box, Skeleton } from "@mui/material";
import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import { issueIdToShowInModalState } from "@/stores/issueStore";
import { userInfoState } from "@/stores/userStore";
import { CommentInputControl } from "@/components/Comment";
import { addItemToCache } from "@/utils/reactQueryCacheUpdaters";
import { COMMENT_PER_PAGE } from "@/constants";

const SkeletonCommentCreator = (
  <Box display="flex" gap={4} sx={{ mb: 5 }}>
    <Skeleton variant="circular" width={50} height={50} />
    <Skeleton
      variant="rectangular"
      height={80}
      sx={{ flexGrow: 1, borderRadius: "4px" }}
    />
  </Box>
);

type CommentCreatorProps = {
  issueDetailsIsLoading: boolean;
};
const CommentCreator = ({ issueDetailsIsLoading }: CommentCreatorProps) => {
  const queryClient = useQueryClient();
  const { memberId: loggedInMemberId } = useRecoilValue(userInfoState);
  const issueId = useRecoilValue(issueIdToShowInModalState);

  const [commentBody, setCommentBody] = useState<string>("");

  const {
    mutate: executeCreateComment,
    data: newComment,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(() =>
    createComment({
      comment: {
        writerId: loggedInMemberId,
        issueId: issueId!,
        commentBody,
      },
    })
  );

  const successAction = useCallback(() => {
    setCommentBody("");
    if (newComment) {
      addItemToCache<ExistingComment>({
        queryClient,
        queryKey: ["commentList", issueId!],
        newItem: newComment,
        pageSize: COMMENT_PER_PAGE,
      });
    }
  }, [newComment, queryClient, issueId]);

  useFeedbackHandler({
    isError,
    errorMessage:
      "댓글을 추가하는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오.",
    isSuccess,
    successMessage: "댓글이 추가되었습니다.",
    successAction,
  });

  if (issueDetailsIsLoading) {
    return SkeletonCommentCreator;
  }

  return (
    <Box sx={{ mb: 5 }}>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box display="flex" gap={4}>
          <UserAvatar />
          <CommentInputControl
            commentBody={commentBody}
            setCommentBody={setCommentBody}
            renderButton={
              <PrimaryButton
                disabled={isLoading}
                onClick={() => executeCreateComment()}
              >
                추가
              </PrimaryButton>
            }
            handleCancel={() => {
              setCommentBody("");
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default CommentCreator;
