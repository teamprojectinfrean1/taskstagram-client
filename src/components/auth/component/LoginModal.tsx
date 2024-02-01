import "../Auth.css";
import { Modal, Button, Box } from "@mui/material";
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
          <div style={{ width: "80%", margin: "auto" }}>
            <div style={{ marginTop: 15 }}>
              <h4>로그인에 실패했습니다.</h4>
              <p style={{ marginTop: 5 }}>
                이메일이나 비밀번호를 확인해 주세요.
              </p>
            </div>
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
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default LoginModal;
