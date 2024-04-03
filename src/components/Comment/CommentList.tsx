import { Stack } from "@mui/material";
import CommentCard from "@/components/Comment/CommentCard";

const CommentList = () => {
  return (
    <Stack spacing={4} sx={{ mt: 3 }}>
      {Array.from({ length: 10 }, (_, index) => (
        <CommentCard key={index} />
      ))}
    </Stack>
  );
};

export default CommentList;
