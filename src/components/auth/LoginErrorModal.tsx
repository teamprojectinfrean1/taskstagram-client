import { Modal, Button, Box, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

type LoginErrorModalProps = {
  showModal: boolean;
  handleClose(): void;
};

const LoginErrorModal = ({ showModal, handleClose }: LoginErrorModalProps) => {
  return (
    <Modal open={showModal}>
      <Box
        boxShadow={10}
        sx={{
          position: "absolute",
          top: "20%",
          left: "40%",
          width: "400px",
          p: 1,
          backgroundColor: "white",
        }}
      >
        <HighlightOffIcon
          sx={{ position: "absolute", mt: 2, ml: 0.8, color: "red" }}
        />
        <Box className="base-layout">
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              로그인에 실패했습니다.
            </Typography>
            <Typography sx={{ mt: 1 }}>
              이메일이나 비밀번호를 확인해 주세요.
            </Typography>
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={{
              my: 2,
              bgcolor: "#CCCCCC",
              color: "#121923",
              ":hover": { bgcolor: "#CCCCCC" },
            }}
            onClick={() => {
              handleClose();
            }}
          >
            확인
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginErrorModal;
