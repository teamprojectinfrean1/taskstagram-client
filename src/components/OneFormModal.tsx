import { useEffect, useState } from "react";
import {
  Button,
  Box,
  OutlinedInput,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import theme from "@/theme/theme";

type OneFormModalProps = {
  isOpen: boolean;
  title: string;
  contentName: string;
  contentText: string;
  invalidText: string;
  showInvalidText: boolean;
  handleConfirm(inputText: string): void;
  handleModalClose(): void;
};

const OneFormModal = ({
  isOpen,
  title,
  contentName,
  contentText,
  invalidText,
  showInvalidText,
  handleConfirm,
  handleModalClose,
}: OneFormModalProps) => {
  const [inputText, setInputText] = useState("");
  useEffect(() => {
    if (isOpen === true) {
      setInputText("");
    }
  }, [isOpen]);
  return (
    <Dialog open={isOpen} onClose={handleModalClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
        <OutlinedInput
          fullWidth
          size="small"
          placeholder={contentName}
          sx={{ mt: 1 }}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />
        {showInvalidText && (
          <Box
            sx={{
              mt: 2,
              color: `${theme.palette.error.main}`,
              textAlign: "left",
            }}
          >
            <Typography fontSize="11px" fontWeight="bold">
              {invalidText}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose}>취소</Button>
        <Button onClick={() => handleConfirm(inputText)}>삭제</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OneFormModal;
