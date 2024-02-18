import { useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  Icon,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import EditIcon from "@mui/icons-material/Edit";
import UserAvatar from "@/components/UserAvatar";
import { Issue } from "@/models/Issue";
import IssueFormModal from "@/components/IssueFormModal";

type IssueTicketProps = {
  issue: Issue;
};

const IssueTicket = () => {
  // const {} = issue;
  const [openExistingIssueFormModal, setOpenExistingIssueFormModal] =
    useState(false);

  return (
    <>
      <Card
        variant="outlined"
        onClick={() => {
          setOpenExistingIssueFormModal(true);
        }}
        sx={{ height: "100px" }}
      >
        <CardActionArea>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              my: 2,
              mx: 3,
            }}
          >
            <Stack spacing={1} sx={{ "& > *": { wordBreak: "break-all" } }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <WorkIcon aria-label="Task Icon" />
                <Typography>taskName</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="h6">issueName </Typography>
                <IconButton
                  size="small"
                  aria-label="Edit issue"
                  onClick={() => {}}
                >
                  <EditIcon />
                </IconButton>
              </Box>
            </Stack>
            <UserAvatar sx={{ width: 50, height: 50 }} />
          </Box>
        </CardActionArea>
      </Card>
      <IssueFormModal
        open={openExistingIssueFormModal}
        handleClose={() => {
          setOpenExistingIssueFormModal(false);
        }}
      />
    </>
  );
};

export default IssueTicket;
