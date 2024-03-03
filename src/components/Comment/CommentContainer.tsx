import { Box, InputLabel, Stack, TextField } from "@mui/material";
import UserAvatar from "@/components/UserAvatar";
import CommentList from "@/components/Comment/CommentList";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

const CommentsContainer = () => {
  return (
    <Stack>
      <InputLabel htmlFor="Comments" sx={{ fontWeight: "bold", mb: 3 }}>
        Comments
      </InputLabel>
      <Box display="flex" gap={4}>
        <UserAvatar sx={{ width: 50, height: 50 }} />
        <TextField
          id="standard-multiline-flexible"
          fullWidth
          placeholder="내용을 입력해주세요"
          multiline
          maxRows={1000}
          variant="standard"
          className="custom-scrollbar"
          sx={{ m: "auto" }}
        />
      </Box>
      <IconButton
        size="large"
        aria-label="post a comment"
        sx={{ alignSelf: "end", p: 1 }}
        onClick={() => {}}
      >
        <SendIcon />
      </IconButton>
      <CommentList />
    </Stack>
  );
};

export default CommentsContainer;
