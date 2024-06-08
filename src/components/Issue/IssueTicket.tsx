import { useRef } from "react";
import {
  Box,
  Card,
  CardActionArea,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import UserAvatar from "@/components/UserAvatar";
import useOverflowDetection from "@/hooks/useOverflowDetection";
import theme from "@/theme/theme";
import { issueIdToShowInModalState } from "@/stores/issueStore";
import { useSetRecoilState } from "recoil";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { SxProps } from "@mui/material";
import { grey } from "@mui/material/colors";

type IssueTicketProps = {
  index?: number;
  issue: IssueSummary;
  parent?: string;
  sx?: SxProps;
};

const IssueTicket = ({ index, issue, parent, sx }: IssueTicketProps) => {
  const {
    issueId,
    issueTitle,
    taskTitle,
    assigneeNickname,
    assigneeProfileImage,
  } = issue;
  const taskTitleRef = useRef<HTMLDivElement>(null);
  const textIsOverflowing = useOverflowDetection(taskTitleRef, "vertical");

  const setIssueIdToShowInModal = useSetRecoilState(issueIdToShowInModalState);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: issueId,
    data: {
      index,
      issue,
      parent,
    },
  });

  return (
    <>
      <Card
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        variant="outlined"
        onClick={() => {
          setIssueIdToShowInModal(issueId);
        }}
        sx={{
          flexShrink: 0,
          height: "110px",
          backgroundColor: theme.palette.background.default,
          transform: CSS.Translate.toString(transform),
          ...sx,
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
                <Typography
                  variant="body2"
                  className="textClamping lineClampOne"
                  sx={{
                    wordBreak: "break-all",
                    color: grey[500],
                    fontWeight: "bold",
                  }}
                >
                  {taskTitle}
                </Typography>
              </Box>
              <Tooltip
                title={assigneeNickname}
                placement="top"
                sx={{ zIndex: 10 }}
              >
                <UserAvatar imageUrl={assigneeProfileImage} size={28} />
              </Tooltip>
            </Box>
            <Tooltip
              title={textIsOverflowing ? issueTitle : ""}
              placement="top-end"
            >
              <Typography
                ref={taskTitleRef}
                className="textClamping lineClampTwo"
                sx={{
                  wordBreak: "break-all",
                  color: theme.palette.text.secondary,
                }}
              >
                {issueTitle}
              </Typography>
            </Tooltip>
          </Stack>
        </CardActionArea>
      </Card>
    </>
  );
};

export default IssueTicket;
