import { useRef } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import UserAvatar from "@/components/UserAvatar";
import { green, grey } from "@mui/material/colors";
import useOverflowDetection from "@/hooks/useOverflowDetection";

type UserStoryProps = {
  story: ProjectMember;
};

const IssueStory = ({ story }: UserStoryProps) => {
  const { userNickname, userProfileImage, hasAssigneeIssueInProgress } = story;
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
      <UserAvatar
        sx={{
          border: `4px solid ${
            hasAssigneeIssueInProgress ? green[400] : grey[400]
          }`,
        }}
        imageUrl={userProfileImage}
      />
      <Tooltip title={textIsOverflowing ? userNickname : ""} placement="bottom">
        <Typography ref={userNameRef} className="textClamping lineClampOne" sx={{fontSize: 18, fontWeight: 600}}>
          {userNickname}
        </Typography>
      </Tooltip>
    </Box>
  );
};

export default IssueStory;
