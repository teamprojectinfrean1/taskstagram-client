import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useMutation } from "react-query";
import { deleteComment } from "@/apis/commentApi";
import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import Spinner from "@/components/Spinner";

type DeleteCommentModalProps = {
  currentCommentId: string;
  handleClose: () => void;
};

const DeleteCommentModal = ({
  currentCommentId,
  handleClose,
}: DeleteCommentModalProps) => {
  const {
    mutate: executeDeleteComment,
    data,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(() => deleteComment({ commentId: currentCommentId }));

  useFeedbackHandler({
    isError,
    isSuccess,
    successMessage: "댓글이 삭제되었습니다.",
    errorMessage:
      "댓글을 삭제하는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오.",
  });

  return (
    <>
      {isLoading && <Spinner centerInViewport size={70} />}
      <Dialog
        open={!!currentCommentId}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        PaperProps={{
          sx: {
            p: 2,
          },
        }}
      >
        <DialogTitle>
          <Typography sx={{ fontWeight: "bold" }}>댓글 삭제</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">댓글을 완전히 삭제할까요?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button
            onClick={() => {
              handleClose();
              executeDeleteComment();
            }}
            autoFocus
          >
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteCommentModal;
