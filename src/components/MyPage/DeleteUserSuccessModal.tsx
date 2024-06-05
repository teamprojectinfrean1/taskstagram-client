import theme from "@/theme/theme";
import { Modal, Box, Typography, Button, Avatar } from "@mui/material";
import Logo from "@/assets/taskstagramLogo.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type DeleteUserSuccessModalProps = {
  open: boolean;
  handleClose(): void;
};

const DeleteUserSuccessModal = ({
  open,
  handleClose,
}: DeleteUserSuccessModalProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("accessToken", "");
  }, []);

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 480,
          boxShadow: 2,
          backgroundColor: "white",
          border: `1px solid ${theme.palette.text.primary}`,
          borderRadius:'7px',
          p: 3,
        }}
      >
        <Box display="flex" alignItems="center">
          <Avatar src={Logo}></Avatar>
          <Typography variant="h6" sx={{ ml: 1 }}>
            일정타그램
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography>회원 탈퇴가 정상적으로 진행되었습니다.</Typography>
          <Typography>그동안 일정타그램을 이용해주셔서 감사합니다.</Typography>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button
              onClick={() => {
                handleClose();
                navigate("/");
              }}
              sx={{ backgroundColor: "#F0EFFA" }}
            >
              확인
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteUserSuccessModal;
