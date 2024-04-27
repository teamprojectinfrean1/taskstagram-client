import { Button } from "@mui/material";
import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import { useMutation } from "react-query";
import { updateComment } from "@/apis/commentApi";
import PrimaryButton from "@/components/PrimaryButton";

type CommentUpdateButtonProps = {
  commentId: string;
  comment: NewOrUpdatedComment;
  endEditMode: () => void;
};

const CommentUpdateButton = ({
  commentId,
  comment,
  endEditMode
}: CommentUpdateButtonProps) => {
  const {
    mutate: executeUpdateComment,
    data,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(() => updateComment({ commentId, comment }));

  useFeedbackHandler({
    isError,
    errorMessage:
      "댓글을 수정하는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오.",
    isSuccess,
    successMessage: "댓글이 수정되었습니다.",
  });

  return (
    <PrimaryButton disabled={isLoading} onClick={() => executeUpdateComment}>
      저장
    </PrimaryButton>
  );
};

export default CommentUpdateButton;
