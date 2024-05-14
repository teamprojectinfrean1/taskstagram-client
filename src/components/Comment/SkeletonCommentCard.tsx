import { Box, Skeleton } from "@mui/material";

const SkeletonCommentCard = () => {
  return (
    <Box display="flex" gap={4}>
      <Skeleton variant="circular" width={50} height={50} />
      <Skeleton
        variant="rectangular"
        height={120}
        sx={{ flexGrow: 1, borderRadius: "4px" }}
      />
    </Box>
  );
};

export default SkeletonCommentCard;
