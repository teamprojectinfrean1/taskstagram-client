import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import IssueTicketContainer from "@/components/IssueTicketContainer";
import IssueStoryContainer from "@/components/IssueStoryContainer";
import { Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const IssuePage = () => {
  return (
    <Box display="flex" flexDirection="column" gap={4} sx={{height: '100%'}}>
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
  );
};

export default IssuePage;
