import { Box, Typography } from "@mui/material";
import UserAvatar from "@/components/UserAvatar";
import { green } from '@mui/material/colors';

const IssueStory = () => {

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      sx={{ m: 2 }}
    >
      <UserAvatar sx={{ border: `4px solid ${green[400]}` }} /> {/* 변경 필요: 사용자가 진행 중인 이슈가 있냐에 따라 색 동적으로 렌더링 */}
      <Typography> 이름 </Typography>
    </Box>
  );
};

export default IssueStory;
