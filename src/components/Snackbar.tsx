import { useRecoilState } from 'recoil';
import { snackbarState } from '@/stores/snackbarStore';
import { Alert, Backdrop, Snackbar as MuiSnackbar } from "@mui/material";

const Snackbar = () => {
  const [{ show, message, severity }, setSnackbar] = useRecoilState(snackbarState);

  const handleClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      show: false
    }));
  };

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
      <MuiSnackbar
        open={show}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity={severity} onClose={handleClose}>
          {message}
        </Alert>
      </MuiSnackbar>
    </>
  );
};

export default Snackbar;


