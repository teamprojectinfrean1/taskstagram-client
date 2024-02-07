import { useState, Fragment } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CloseIcon from "@mui/icons-material/Close";
import TextEditor from "@/components/TextEditor";
import CommentsContainer from "@/components/CommentsContainer";
import SearchableSelect from "@/components/SearchableSelect";
import { IssueFormData } from "@/models/Issue";
import { ContentState } from "draft-js";

type IssueFormModalProps = {
  isInitialEntry?: boolean;
  open: boolean;
  handleClose: () => void;
};

const IssueFormModal = ({
  isInitialEntry,
  open,
  handleClose,
}: IssueFormModalProps) => {
  const [formData, setFormData] = useState<IssueFormData>({
    title: null,
    content: null,
    assignee: null,
    task: null,
    dateRange: null,
    type: null,
    status: null,
  });

  console.log(formData);

  const handleInputChange = (
    field: keyof IssueFormData,
    value: string | string[] | ContentState | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    // content: draftToHtml(convertToRaw(props.editorState.getCurrentContent()))
    console.log(formJson);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          maxWidth: 1200,
          width: "100%",
        },
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogContent>
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
              <TextEditor id="content" initialContent={formData.content} />
            </Box>
            <CommentsContainer />
          </Grid>
          <Grid item xs={12} md={4} sx={{ "& > *": { mb: 3 } }}>
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
            <SearchableSelect
              label="타입"
              possibleOptions={["Option 1", "Option 2", "Option 3"]}
              selectedOptions={formData.type}
              onSelectionChange={(value) => handleInputChange("type", value)}
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
