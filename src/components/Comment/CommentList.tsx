import { Stack } from "@mui/material";
import CommentCard from "@/components/Comment/CommentCard";

// type CommentListProps = {
//   commentList: ExistingComment[];
// };

const CommentList = () => {
  return (
    <Stack spacing={4} sx={{ mt: 3 }}>
      <CommentCard
        comment={{
          commentId: "comment-1",
          commentBody: "hello",
          lastModifiedDate: "",
          userId: "soopark",
          userNickname: "soopark",
          userProfileImage: "",
        }}
      />
    </Stack>
  );
};

export default CommentList;
