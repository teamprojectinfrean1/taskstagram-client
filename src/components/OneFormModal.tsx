import { useEffect, useState } from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import theme from "@/theme/theme";
import PrimaryButton from "./PrimaryButton";

type OneFormModalProps = {
  isOpen: boolean;
  title: string;
  contentName: string;
  contentText: string;
  invalidText: string;
  handleConfirm(inputText: string): void;
  handleModalClose(): void;
};

const OneFormModal = ({
  isOpen,
  title,
  contentName,
  contentText,
  invalidText,
  handleConfirm,
  handleModalClose,
}: OneFormModalProps) => {
  const [inputText, setInputText] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen === true) {
      setInputText("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (contentName !== inputText && inputText !== "") {
      setShowError(true);
      setErrorMessage(invalidText);
    } else {
      setShowError(false);
      setErrorMessage("");
    }
  }, [inputText]);

  return (
    <Dialog open={isOpen} onClose={handleModalClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
        <TextField
          sx={{
            "& .MuiFormHelperText-root": {
              position: "absolute",
              mt: 5,
              ml: 1,
              fontSize: "11px",
              fontWeight: "bold",
              color: theme.palette.error.main,
            },
          }}
          fullWidth
          size="small"
          placeholder={contentName}
          value={inputText}
          error={showError}
          helperText={errorMessage}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <PrimaryButton onClick={handleModalClose}>닫기</PrimaryButton>
        <PrimaryButton
          sx={{ mr: "15px" }}
          disabled={inputText === "" || showError}
          onClick={() => handleConfirm(inputText)}
        >
          삭제
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
};

export default OneFormModal;
