import { InputLabel, Stack } from "@mui/material";
import CommentList from "@/components/Comment/CommentList";
import DeleteCommentModal from "@/components/Comment/DeleteCommentModal";
import { useRecoilState } from "recoil";
import { commentIdSelectedToDeleteState } from "@/stores/commentStore";
import CommentCreator from "@/components/Comment/CommentCreator";


const CommentsContainer = () => {
  const [commentIdSelectedToDelete, setCommentIdSelectedToDelete] =
    useRecoilState(commentIdSelectedToDeleteState);

  return (
    <>
      <Stack sx={{ my: 8 }}>
        <InputLabel htmlFor="Comments" sx={{ fontWeight: "bold", mb: 3 }}>
          댓글
        </InputLabel>
        <CommentCreator/>
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

export default CommentsContainer;
