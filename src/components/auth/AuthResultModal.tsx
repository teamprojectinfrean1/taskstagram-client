import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Modal, Button, Box, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

type LoginErrorModalProps = {
  type: string;
  showModal: boolean;
  isSuccess: boolean;
  handleClose(): void;
};

type testTypes = {
  type: string;
  isSuccess: boolean;
};

const AuthResultModal = ({
  type,
  showModal,
  isSuccess,
  handleClose,
}: LoginErrorModalProps) => {
  const handleIsSuccessText = ({ type, isSuccess }: testTypes) => {
    console.log(type, isSuccess);
    switch (type) {
      case "login":
        return (
          !isSuccess && (
            <>
              <Typography sx={{ fontWeight: "bold" }}>
                로그인에 실패했습니다.
              </Typography>
              <Typography sx={{ mt: 1 }}>
                이메일이나 비밀번호를 확인해 주세요.
              </Typography>
            </>
          )
        );
      case "email":
        return isSuccess ? (
          <>
            <Typography sx={{ fontWeight: "bold" }}>
              사용 가능한 이메일입니다.
            </Typography>
          </>
        ) : (
          <>
            <Typography sx={{ fontWeight: "bold", fontFamily: "Inter" }}>
              이미 가입된 이메일입니다.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: "#565656",
                fontFamily: "Inter",
                fontWeight: "bold",
              }}
            >
              동일한 이메일 주소로 중복 가입이 불가능합니다.
            </Typography>
          </>
        );
    }
  };

  return (
    <Modal open={showModal}>
      <Box
        boxShadow={10}
        sx={{
          position: "absolute",
          top: "20%",
          left: "40%",
          width: "410px",
          p: 1,
          backgroundColor: "white",
        }}
      >
        <Box sx={{ position: "absolute", mt: 2, ml: 0.8 }}>
          {isSuccess ? (
            <CheckCircleOutlineIcon
              sx={{
                color: "white",
                bgcolor: "#344F78",
                borderRadius: "50%",
                p: 0.2,
              }}
            />
          ) : (
            <>
              <HighlightOffIcon
                sx={{
                  color:'white',
                  bgcolor: "#F30C0C",
                  borderRadius: "50%",
                  p: 0.2,
                }}
              />
            </>
          )}
        </Box>
        <Box className="base-layout">
          <Box sx={{ mt: 2 }}>{handleIsSuccessText({ type, isSuccess })}</Box>
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

export default AuthResultModal;
