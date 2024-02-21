import IssueFormModal from "@/components/IssueManagement/IssueFormModal";
import { useState } from "react";
import IssueTicketContainer from "@/components/IssueManagement/IssueTicketContainer";
import IssueStoryContainer from "@/components/IssueManagement/IssueStoryContainer";
import { Box, Stack } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const IssuePage = () => {
  const [openNewIssueFormModal, setOpenNewIssueFormModal] = useState(false);

  return (
    <>
      <Stack
        spacing={4}
        sx={{
          height: "100%",
          minHeight: "700px",
        }}
      >
        <Box sx={{ height: "20%", minHeight: "120px" }}>
          <IssueStoryContainer title="진행 중" />
        </Box>
        <Box
          display="flex"
          flexDirection={{
            xs: "column",
            md: "row",
          }}
          gap={4}
          sx={{
            height: "80%",
            minHeight: "300px",
          }}
        >
          <IssueTicketContainer
            ariaLabel="create issue"
            IconComponent={AddCircleIcon}
            onIconComponentClick={() => {
              setOpenNewIssueFormModal(true);
            }}
            title="할 일"
          />
          <IssueTicketContainer
            ariaLabel="delete issue"
            IconComponent={DeleteIcon}
            onIconComponentClick={() => {}}
            title="완료"
          />
        </Box>
      </Stack>
      <IssueFormModal
        open={openNewIssueFormModal}
        handleClose={() => {
          setOpenNewIssueFormModal(false);
        }}
      />
    </>
  );
};

export default IssuePage;
