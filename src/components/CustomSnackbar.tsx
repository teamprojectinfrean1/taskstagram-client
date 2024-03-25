import { Alert, Backdrop, Snackbar } from "@mui/material";

type CustomSnackbarProps = {
  handleClose: () => void;
  message: string;
  severity: "info" | "success" | "warning" | "error";
  show: boolean;
};

const CustomSnackbar = ({
  handleClose,
  message,
  severity,
  show,
}: CustomSnackbarProps) => {
  return (
    <>
      <Backdrop
        open={show}
        sx={{
          zIndex: 1200,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          pointerEvents: "none",
        }}
      />
      <Snackbar
        open={show}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        color="error"
      >
        <Alert severity={severity} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomSnackbar;
