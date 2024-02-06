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

type BasicModalProps = {
  modalButtonContent: React.ReactNode; // 아이콘으로 변경
  additionalInputs: React.ReactNode;
  // onInputChange: () => {};
  addCommentSection?: boolean;
};

const BasicModal = ({
  modalButtonContent,
  additionalInputs,
  addCommentSection,
}: BasicModalProps) => {
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    console.log(formJson);
    handleClose();
  };

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {modalButtonContent}
      </Button>
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
                  aria-labelledby="title"
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box>
                <InputLabel
                  htmlFor="content"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  Content
                </InputLabel>
                <TextEditor aria-labelledby="content" isInitialEntry={true} />
              </Box>
              {addCommentSection && <CommentsContainer />}
            </Grid>
            <Grid item xs={12} md={4} sx={{ "& > *": { mb: 3 } }}>
              {additionalInputs}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default BasicModal;
