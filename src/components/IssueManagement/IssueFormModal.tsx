import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CloseIcon from "@mui/icons-material/Close";
import TextEditor from "@/components/Editor/TextEditor";
import CommentContainer from "@/components/Comment/CommentContainer";
import SearchableSelect from "@/components/SearchableSelect";
import { RawDraftContentState } from "draft-js";
import theme from "@/theme/theme";
import DurationPicker from "@/components/DurationPicker";
import { grey } from "@mui/material/colors";
import { IssueFormData } from "@/models/Issue";

type IssueFormModalProps = {
  currentIssueId: string;
  handleClose: () => void;
};

const IssueFormModal = ({
  currentIssueId,
  handleClose,
}: IssueFormModalProps) => {
  const [formData, setFormData] = useState<IssueFormData>({
    title: null,
    content: null,
    assignee: null,
    task: null,
    startDate: null,
    endDate: null,
    type: null,
    status: null,
  });

  const handleInputChange = (
    field: keyof IssueFormData,
    value: string | string[] | RawDraftContentState | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // api 명세서 참고하고 추후 수정 필요:
    // const formData = new FormData(event.currentTarget);

    // const rawContentState = formData.get('content');
    // const contentString = rawContentState ? JSON.stringify(rawContentState) : null;

    // const formJson = Object.fromEntries(formData.entries());
    // formJson.content = contentString;

    // console.log(formJson);
    // handleClose();
  };

  return (
    <Dialog
      open={!!(currentIssueId && currentIssueId.length > 0)}
      onClose={handleClose}
      PaperProps={{
        sx: {
          maxWidth: 1400,
          width: "100%",
          backgroundColor: theme.palette.background.default,
        },
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogContent className="custom-scrollbar">
        <DialogActions sx={{ mb: 3, p: 0 }}>
          <Button
            type="submit"
            onClick={handleClose}
            startIcon={<SaveAsIcon />}
          >
            저장
          </Button>
          <Button onClick={handleClose} startIcon={<CloseIcon />}>
            취소
          </Button>
        </DialogActions>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} sx={{ "& > *": { mb: 3 } }}>
            <Box>
              <InputLabel htmlFor="title" sx={{ fontWeight: "bold", mb: 1 }}>
                Title
              </InputLabel>
              <TextField
                id="title"
                variant="outlined"
                fullWidth
                value={formData.title ?? ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </Box>
            <Box>
              <InputLabel htmlFor="content" sx={{ fontWeight: "bold", mb: 1 }}>
                Content
              </InputLabel>
              <TextEditor
                id="content"
                initialContent={formData.content}
                handleContentChange={(content) =>
                  handleInputChange("content", content)
                }
              />
            </Box>
            <CommentContainer />
          </Grid>
          <Grid item xs={12} md={4} sx={{ "& > *": { mb: 3 } }}>
            <Typography align="right" variant="body2" sx={{ color: grey[600] }}>
              날짜
            </Typography>
            <SearchableSelect
              label="담당자"
              possibleOptions={["Option 1", "Option 2", "Option 3"]}
              selectedOptions={formData.assignee}
              multiselect
              onSelectionChange={(value) =>
                handleInputChange("assignee", value)
              }
            />
            <SearchableSelect
              label="Task"
              possibleOptions={["Option 1", "Option 2", "Option 3"]}
              selectedOptions={formData.task}
              onSelectionChange={(value) => handleInputChange("task", value)}
            />
            <InputLabel htmlFor="dateRange" sx={{ fontWeight: "bold", mb: 1 }}>
              기간
            </InputLabel>
            <DurationPicker
              selectedStartDate={formData.startDate}
              selectedEndDate={formData.endDate}
              onStartDateSelectionChange={(value) =>
                handleInputChange("startDate", value)
              }
              onEndDateSelectionChange={(value) =>
                handleInputChange("endDate", value)
              }
            />
            <SearchableSelect
              label="상태"
              possibleOptions={["Option 1", "Option 2", "Option 3"]}
              selectedOptions={formData.status}
              onSelectionChange={(value) => handleInputChange("status", value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default IssueFormModal;
