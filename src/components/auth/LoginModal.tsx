import "./Auth.css";
import { Modal, Button, Box, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface PropsType {
  showModal: boolean;
  setShowModal(type: boolean): void;
}

const LoginModal = (props: PropsType) => {
  return (
    <>
      <Modal open={props.showModal}>
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
              sx={{ mt: 2, mb: 2, bgcolor: "#CCCCCC", color: "#121923" }}
              onClick={() => {
                props.setShowModal(false);
              }}
            >
              확인
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default LoginModal;
