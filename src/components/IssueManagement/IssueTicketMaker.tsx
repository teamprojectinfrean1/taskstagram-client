import { useState } from "react";
import { Card, CardActionArea, Stack, TextField } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import theme from "@/theme/theme";
import { IssueSummary } from "@/models/Issue";
import { v4 as uuidv4 } from "uuid";

type IssueTicketMakerProps = {
  handleAddIssue: (newIssue: IssueSummary | null) => void;
};

const IssueTicketMaker = ({ handleAddIssue }: IssueTicketMakerProps) => {
  const [issueName, setIssueName] = useState("");

  const handleCreateNewIssue = () => {
    let newIssue = null;

    if (issueName.trim() !== "") {
      newIssue = {
        issueId: uuidv4(),
        issueName,
        taskId: "",
        taskName: "",
        userUuid: "",
        userNickname: "",
        userImageUrl: "",
      };
    }

    handleAddIssue(newIssue);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleCreateNewIssue();
      event.preventDefault();
    }
  };

  return (
    <ClickAwayListener onClickAway={handleCreateNewIssue}>
      <Card
        variant="outlined"
        sx={{
          flexShrink: 0,
          height: "110px",
          backgroundColor: theme.palette.background.default,
          border: "2px solid #313449",
        }}
      >
        <CardActionArea sx={{ height: "100%" }}>
          <Stack
            spacing={1}
            justifyContent="flex-start"
            sx={{ height: "100%", py: 1.5, px: 2 }}
          >
            <TextField
              variant="outlined"
              onChange={(e) => setIssueName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="새 이슈의 제목을 입력하세요.."
              multiline
              maxRows={2}
              className="custom-scrollbar"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
              }}
            />
          </Stack>
        </CardActionArea>
      </Card>
    </ClickAwayListener>
  );
};

export default IssueTicketMaker;
