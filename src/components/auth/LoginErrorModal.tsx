import "./Auth.css";
import { Modal, Button, Box, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

type PropsType = {
  showModal: boolean;
  handleClose(): void;
}

const LoginErrorModal = ({ showModal, handleClose }: PropsType) => {
  return (
    <Modal open={showModal}>
      <Box className="modal-style" boxShadow={10}>
        <HighlightOffIcon className="state-left" />
        <Box sx={{ width: "80%", m: "auto" }}>
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
            sx={{ my: 2, bgcolor: "#CCCCCC", color: "#121923" }}
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
