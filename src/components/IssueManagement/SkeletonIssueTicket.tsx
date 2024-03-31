import { Box, Card, CardActionArea, Skeleton, Stack } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import theme from "@/theme/theme";

const SkeletonIssueTicket = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        flexShrink: 0,
        height: "110px",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <CardActionArea sx={{ height: "100%" }}>
        <Stack
          spacing={1}
          justifyContent="flex-start"
          sx={{ height: "100%", py: 1.5, px: 2 }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="start"
          >
            <Box display="flex" alignItems="center" gap={1}>
              <WorkIcon aria-label="Task Icon" sx={{ fontSize: "20px" }} />
              <Skeleton variant="text" width={100} />
            </Box>
            <Skeleton variant="circular" width={28} height={28} />
          </Box>
          <Skeleton variant="text" height={60} />
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default SkeletonIssueTicket;
