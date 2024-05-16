import { InputLabel, Stack } from "@mui/material";
import {
  CommentCreator,
  CommentList,
  DeleteCommentModal,
} from "@/components/Comment";
import { useRecoilState } from "recoil";
import { commentIdSelectedToDeleteState } from "@/stores/commentStore";

type CommentContainerProps = {
  issueDetailsIsLoading: boolean;
};

const CommentContainer = ({
  issueDetailsIsLoading,
}: CommentContainerProps) => {
  const [commentIdSelectedToDelete, setCommentIdSelectedToDelete] =
    useRecoilState(commentIdSelectedToDeleteState);

  return (
    <>
      <Stack sx={{ my: 2 }}>
        <InputLabel htmlFor="Comments" sx={{ fontWeight: "bold", mb: 3 }}>
          댓글
        </InputLabel>
        <CommentCreator issueDetailsIsLoading={issueDetailsIsLoading} />
        <CommentList />
      </Stack>
      {commentIdSelectedToDelete && (
        <DeleteCommentModal
          currentCommentId={commentIdSelectedToDelete}
          handleClose={() => setCommentIdSelectedToDelete(null)}
        />
      )}
    </>
  );
};

export default CommentContainer;
