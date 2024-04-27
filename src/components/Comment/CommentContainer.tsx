import { Box, InputLabel, Stack } from "@mui/material";
import CommentList from "@/components/Comment/CommentList";
import CommentEditor from "@/components/Comment/CommentEditor";
import DeleteCommentModal from "@/components/Comment/DeleteCommentModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { commentIdSelectedToDeleteState } from "@/stores/commentStore";
import { userInfoState } from "@/stores/userStore";
import UserAvatar from "@/components/UserAvatar";

const CommentsContainer = () => {
  const [commentIdSelectedToDelete, setCommentIdSelectedToDelete] =
    useRecoilState(commentIdSelectedToDeleteState);

  const { userId } = useRecoilValue(userInfoState);

  return (
    <>
      <Stack sx={{ my: 8 }}>
        <InputLabel htmlFor="Comments" sx={{ fontWeight: "bold", mb: 3 }}>
          댓글
        </InputLabel>
        <Box display="flex" gap={4}>
          <UserAvatar sx={{ width: 50, height: 50 }} />
          <CommentEditor userId={userId} />
        </Box>
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
