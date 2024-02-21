import UserAvatar from "@/components/UserAvatar";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const Comment = () => {
  return (
    <Box display="flex" alignItems="center" gap={4}>
      <UserAvatar sx={{ width: 50, height: 50 }} />
      <Box
        sx={{
          width: "100%",
          py: 1,
          px: 3,
          border: `1px solid ${grey[400]}`,
          borderRadius: 4,
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>username</Typography>
        <Typography>댓글 내용</Typography>
        <Typography
          variant="subtitle2"
          textAlign="right"
          sx={{ color: grey[600] }}
        >
          날짜
        </Typography>
      </Box>
    </Box>
  );
};

export default Comment;
