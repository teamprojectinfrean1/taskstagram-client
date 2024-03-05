import { signupInfoState } from "@/stores/AuthStore";
import theme from "@/theme/theme";
import { checkAuthInputValidity, fetchDupicate } from "@/utils/authCheck";
import { Typography, OutlinedInput, Grid, Button, Box } from "@mui/material";
import { useState } from "react";
import { useRecoilState } from "recoil";
import AuthResultModal from "./AuthResultModal";

type NicknameInputProps = {
  nickname: string;
  // nicknameFlag: boolean;
  setNickname(nickname: string): void;
  // setNicknameFlag(nicknameFlag: boolean): void;
};

const NicknameInput = ({ nickname, setNickname }: NicknameInputProps) => {
  const [nicknameValidityFlag, setNicknameValidityFlag] = useState(false);
  const [nicknameDuplicateFlag, setNicknameDuplicateFlag] = useState(false);

  const nicknameValidityState = !!(nickname && !nicknameValidityFlag);
  const nicknameIsDisabled = !!(!nicknameValidityFlag || nicknameDuplicateFlag);

  const [showModal, setShowModal] = useState(false);
  const changeNicknameDuplicateButton = (nickname: string) => {
    setShowModal(true);
    const nicknameDuplication = fetchDupicate({
      type: "nickname",
      authValue: nickname,
    });
    nicknameDuplication
      ? setNicknameDuplicateFlag(true)
      : setNicknameDuplicateFlag(false);
  };

  return (
    <>
      <Typography sx={{ mt: 4, ml: 0.5 }}>Nickname</Typography>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <OutlinedInput
            type="text"
            fullWidth
            size="small"
            placeholder={"닉네임"}
            value={nickname}
            error={nicknameValidityState}
            onChange={(e) => {
              setNickname(e.target.value)
              setNicknameValidityFlag(
                checkAuthInputValidity({
                  type: "nickname",
                  authValue: e.target.value,
                })
              );
            }}
          />
          {nicknameValidityState && (
            <Typography
              sx={{
                position: "absolute",
                mt: 0.1,
                ml: 1,
                fontWeight: "bold",
                fontSize: "11px",
                color: theme.palette.error.main,
              }}
            >
              닉네임은 초성 금지,2글자 이상, 20글자 이하여야 합니다.
            </Typography>
          )}
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: `${theme.palette.secondary.main}`,
              height: "41px",
              borderRadius: "7px",
            }}
            disabled={nicknameIsDisabled}
            onClick={() => {
              changeNicknameDuplicateButton(nickname);
            }}
          >
            {nicknameDuplicateFlag ? "확인 완료" : "중복 확인"}
          </Button>
        </Grid>
      </Grid>
      <AuthResultModal
        type="nickname"
        showModal={showModal}
        isSuccess={nicknameDuplicateFlag}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
};

export default NicknameInput;
