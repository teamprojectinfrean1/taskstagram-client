import { Button } from "@mui/material";
import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import { useMutation } from "react-query";
import { createComment } from "@/apis/commentApi";
import PrimaryButton from "@/components/PrimaryButton";

type CommentCreateButtonProps = {
  comment: NewOrUpdatedComment;
  endEditMode: () => void;
};

const CommentCreateButton = ({
  comment,
  endEditMode,
}: CommentCreateButtonProps) => {
  const {
    mutate: executeCreateComment,
    data,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(() => createComment({ comment }));

  useFeedbackHandler({
    isError,
    errorMessage:
      "댓글을 추가하는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오.",
    isSuccess,
    successMessage: "댓글이 추가되었습니다.",
  });

  return (
    <PrimaryButton disabled={isLoading} onClick={() => executeCreateComment}>
      추가
    </PrimaryButton>
  );
};

export default CommentCreateButton;
