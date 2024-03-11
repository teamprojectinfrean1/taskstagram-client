import { useState, useRef } from "react";
import {
  Box,
  Card,
  CardActionArea,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import UserAvatar from "@/components/UserAvatar";
import IssueFormModal from "@/components/IssueManagement/IssueFormModal";
import useOverflowDetection from "@/hooks/useOverflowDetection";
import theme from "@/theme/theme";
import { currentIssueIdToShowInModal } from "@/stores/issueStore";
import { useRecoilState } from "recoil";

type IssueTicketProps = {
  id: string;
  testText: string;
};

const IssueTicket = ({ id, testText }: IssueTicketProps) => {
  const taskNameRef = useRef<HTMLDivElement>(null);
  const textIsOverflowing = useOverflowDetection(taskNameRef, "vertical");

  const [currentIssueId, setCurrentIssueId] = useRecoilState(
    currentIssueIdToShowInModal
  );

  return (
    <>
      <Card
        variant="outlined"
        onClick={() => {
          setCurrentIssueId(id);
        }}
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
                <Typography
                  variant="body2"
                  className="textClamping lineClampOne"
                  sx={{ wordBreak: "break-all" }}
                >
                  taskName
                </Typography>
              </Box>
              <Tooltip
                title={testText}
                placement="top"
                sx={{ zIndex: 10 }}
              >
                <UserAvatar sx={{ width: 28, height: 28 }} />
              </Tooltip>
            </Box>
            <Tooltip
              title={textIsOverflowing ? testText : ""}
              placement="top-end"
            >
              <Typography
                ref={taskNameRef}
                className="textClamping lineClampTwo"
                sx={{ wordBreak: "break-all" }}
              >
                {testText}
              </Typography>
            </Tooltip>
          </Stack>
        </CardActionArea>
      </Card>
    </>
  );
};

export default IssueTicket;
