import IssueFormModal from "@/components/IssueFormModal";
import { Button } from "@mui/material";
import { useState } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import IssueTicketContainer from "@/components/IssueTicketContainer";
import IssueStoryContainer from "@/components/IssueStoryContainer";
import { Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const IssuePage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      이슈 페이지
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        sx={{ height: "100%" }}
      >
        <IssueStoryContainer
          title="진행 중"
          IconComponent={KeyboardDoubleArrowRightIcon}
          ariaLabel="next"
        />
        <Box display="flex" gap={4} width="100%">
          <IssueTicketContainer
            title="할 일"
            IconComponent={AddCircleIcon}
            ariaLabel="create issue"
          />
          <IssueTicketContainer
            title="완료"
            IconComponent={DeleteIcon}
            ariaLabel="delete issue"
          />
        </Box>
      </Box>
      <Button
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        open
      </Button>
      <IssueFormModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default IssuePage;