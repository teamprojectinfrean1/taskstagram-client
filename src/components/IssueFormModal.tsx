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
} from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CloseIcon from "@mui/icons-material/Close";
import TextEditor from "@/components/TextEditor";
import CommentsContainer from "@/components/CommentsContainer";
import SearchableSelect from "@/components/SearchableSelect";
import { IssueFormData } from "@/models/Issue";
import { RawDraftContentState } from "draft-js";

type IssueFormModalProps = {
  isInitialEntry?: boolean;
  open: boolean;
  handleClose: () => void;
};

const IssueFormModal = ({
  isInitialEntry = false,
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
    value: string | RawDraftContentState | string[] | null
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
                value={formData.title}
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
            <CommentsContainer />
          </Grid>
          <Grid item xs={12} md={4} sx={{ "& > *": { mb: 3 } }}>
            <SearchableSelect
              label="담당자"
              possibleOptions={["asdfasdfasdfasdfasdfasdfasdfasd1", "Option 2", "Option 3"]}
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
