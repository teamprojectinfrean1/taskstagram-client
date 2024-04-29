import { Box, InputLabel, Skeleton } from "@mui/material";

const SkeletonTextField = () => (
  <Skeleton variant="rectangular" height={67} sx={{ borderRadius: "4px" }} />
);
export const SkeletonIssueFormModalMainContent = () => {
  return (
    <>
      <Box>
        <InputLabel htmlFor="title" sx={{ fontWeight: "bold", mb: 1 }}>
          제목 *
        </InputLabel>
        <SkeletonTextField />
      </Box>
      <Box>
        <InputLabel htmlFor="content" sx={{ fontWeight: "bold", mb: 1 }}>
          내용
        </InputLabel>
        <Skeleton
          variant="rectangular"
          height={450}
          sx={{ borderRadius: "4px" }}
        />
      </Box>
    </>
  );
};
