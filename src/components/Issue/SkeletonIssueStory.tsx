import { Box, Skeleton } from "@mui/material";

const SkeletonIssueStory = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      sx={{ m: 2 }}
    >
      <Skeleton variant="circular" width={50} height={50} />
      <Skeleton variant="text" width={50} />
    </Box>
  );
};

export default SkeletonIssueStory;
