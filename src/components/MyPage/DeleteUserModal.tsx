import theme from "@/theme/theme";
import { userInfoState } from "@/stores/userStore";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import CloseIcon from "@mui/icons-material/Close";
import DeleteUserSuccessModal from "./DeleteUserSuccessModal";
import { useMutation } from "react-query";
import { deleteUser } from "@/apis/memberApi";

type DeleteUserModalProps = {
  open: boolean;
  handleClose(): void;
};

const DeleteUserModal = ({ open, handleClose }: DeleteUserModalProps) => {
  const userInfo = useRecoilValue(userInfoState);
  const memberId = userInfo.memberId;
  const id = userInfo.id;
  const [deleteId, setDeleteId] = useState("");

  const [errorState, setErrorState] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");

  const [SuccessOpen, setSuccessOpen] = useState(false);

  const mutateDeleteUser = useMutation((memberId: string) =>
    deleteUser(memberId)
  );

  useEffect(() => {
    if (mutateDeleteUser.data === "member deleted") {
      handleClose();
      setSuccessOpen(true);
    }
  }, [mutateDeleteUser.data]);

  const checkSameId = () => {
    if (deleteId === id) {
      setShowErrorMessage("");
      setErrorState(false);
      mutateDeleteUser.mutate(memberId);
    } else {
      setShowErrorMessage(
        "입력하신 아이디가 일치하지 않습니다. 다시 확인해주세요."
      );
      setErrorState(true);
    }
  };

  useEffect(() => {
    if (mutateDeleteUser.error) {
      alert(
        "회원 탈퇴 요청 중 서버 문제가 발생하였습니다. 잠시 후 다시 시도해주세요."
      );
    }
  }, [mutateDeleteUser.error]);

  return (
    <>
      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 480,
            boxShadow: 2,
            bgcolor: "white",
            border: `1px solid ${theme.palette.text.primary}`,
            borderRadius:'7px',
            p: 3,
          }}
        >
          <Box sx={{ position: "absolute", right: "1%", top: "5%" }}>
            <Button
              onClick={() => {
                setDeleteId("");
                setErrorState(false);
                setShowErrorMessage("");
                handleClose();
              }}
            >
              <CloseIcon></CloseIcon>
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography fontSize="15px">
              일정타그램을 정말 탈퇴하시겠습니까?
            </Typography>
            <Typography fontSize="15px">
              탈퇴 후에는 사용자 계정의{" "}
              <Typography component="span" color="red" fontSize="15px">
                모든 데이터가 삭제
              </Typography>
              됩니다.
            </Typography>
            <Typography sx={{ mt: 2, mb: 1, fontSize: "15px" }}>
              정말 탈퇴를 원하신다면, 아래 입력창에 아이디를 입력해주세요.
            </Typography>
          </Box>
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
            size="small"
            fullWidth
            placeholder={id}
            value={deleteId}
            error={errorState}
            helperText={showErrorMessage}
            onChange={(e) => {
              setDeleteId(e.target.value);
            }}
          />
          <Box sx={{ textAlign: "right", mt: 3 }}>
            <Button
              variant="contained"
              size="small"
              sx={{ backgroundColor: "#ff1744" }}
              onClick={() => {
                checkSameId();
              }}
            >
              회원 탈퇴
            </Button>
          </Box>
        </Box>
      </Modal>

      {SuccessOpen && (
        <DeleteUserSuccessModal
          open={SuccessOpen}
          handleClose={() => setSuccessOpen(false)}
        />
      )}
    </>
  );
};

export default DeleteUserModal;
