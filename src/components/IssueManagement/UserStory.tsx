import { useRef } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import UserAvatar from "@/components/UserAvatar";
import { green } from "@mui/material/colors";
import useOverflowDetection from "@/hooks/useOverflowDetection";

type UserStoryProps = {
  name: string;
};

const UserStory = ({ name }: UserStoryProps) => {
  const userNameRef = useRef<HTMLDivElement>(null);
  const textIsOverflowing = useOverflowDetection(userNameRef, "vertical");

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      sx={{ m: 2 }}
    >
      <UserAvatar sx={{ border: `4px solid ${green[400]}` }} />
      {/* 변경 필요: 사용자가 진행 중인 이슈가 있냐에 따라 색 동적으로 렌더링 */}
      <Tooltip
        title={textIsOverflowing ? name : ""}
        placement="bottom"
      >
        <Typography ref={userNameRef} className="textClamping lineClampOne">
          {name}
        </Typography>
      </Tooltip>
    </Box>
  );
};

export default UserStory;
