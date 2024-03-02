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
import { currentIssueIdToShowInModal } from '@/stores/issueStore';
import { useRecoilState } from 'recoil';

type IssueTicketProps = {
  id: string;
  testText: string;
};

const IssueTicket = ({ id, testText }: IssueTicketProps) => {
  const taskNameRef = useRef<HTMLDivElement>(null);
  const textIsOverflowing = useOverflowDetection(taskNameRef, "vertical");

  const [currentIssueId, setCurrentIssueId] = useRecoilState(currentIssueIdToShowInModal);

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
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{
              height: "100%",
              py: 2,
              px: 3,
            }}
          >
            <Stack
              spacing={1}
              sx={{
                "& > *": {
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  wordBreak: "break-all",
                },
              }}
            >
              <Box>
                <WorkIcon aria-label="Task Icon" />
                <Typography
                  variant="body2"
                  className="textClamping lineClampOne"
                >
                  taskName
                </Typography>
              </Box>
              <Box>
                <Tooltip
                  title={textIsOverflowing ? testText : ""}
                  placement="top-end"
                >
                  <Typography
                    ref={taskNameRef}
                    className="textClamping lineClampTwo"
                  >
                    {testText}
                  </Typography>
                </Tooltip>
              </Box>
            </Stack>
            <UserAvatar
              sx={{ width: 50, height: 50, alignSelf: "center", ml: 4 }}
            />
          </Box>
        </CardActionArea>
      </Card>
    </>
  );
};

export default IssueTicket;
