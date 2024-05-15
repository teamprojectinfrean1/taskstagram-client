import { Box, Grid, InputLabel, Skeleton, Stack } from "@mui/material";

const SkeletonTextField = () => (
  <Skeleton variant="rectangular" height={67} sx={{ borderRadius: "4px" }} />
);

const SkeletonDurationPicker = () => (
  <Skeleton
    variant="rectangular"
    height={67}
    sx={{ borderRadius: "4px", flexBasis: "50%" }}
  />
);

const SkeletonIssueFormModal = () => {
  return (
    <>
      <Grid item xs={12} md={8} sx={{ "& > *": { mb: 3 } }}>
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
      </Grid>
      <Grid item xs={12} md={4} sx={{ "& > *": { mb: 3 } }}>
        <Stack>
          <InputLabel htmlFor="assignee" sx={{ fontWeight: "bold", mb: 1 }}>
            담당자
          </InputLabel>
          <SkeletonTextField />
        </Stack>
        <Stack>
          <InputLabel htmlFor="task" sx={{ fontWeight: "bold", mb: 1 }}>
            태스크 *
          </InputLabel>
          <SkeletonTextField />
        </Stack>
        <Stack>
          <InputLabel htmlFor="dateRange" sx={{ fontWeight: "bold", mb: 1 }}>
            기간
          </InputLabel>
          <Box display="flex" gap={2}>
            <SkeletonDurationPicker />
            <SkeletonDurationPicker />
          </Box>
        </Stack>
        <Stack>
          <InputLabel htmlFor="issueStatus" sx={{ fontWeight: "bold", mb: 1 }}>
            상태 *
          </InputLabel>
          <SkeletonTextField />
        </Stack>
        <Stack alignItems="flex-end">
          <Skeleton variant="text" width={150} />
          <Skeleton variant="text" width={120} />
        </Stack>
      </Grid>
    </>
  );
};

export default SkeletonIssueFormModal;
