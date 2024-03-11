import theme from "@/theme/theme";
import { checkAuthInputValidity } from "@/utils/authCheck";
import { Typography, OutlinedInput, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchNicknameDupicate } from "@/apis/auth";
import { useQuery } from "react-query";

type NicknameInputProps = {
  nickname: string;
  setNickname(nickname: string): void;
};

const NicknameInput = ({ nickname, setNickname }: NicknameInputProps) => {
  const [isClickNicknameButton, setIsClickNicknameButton] = useState(false);
  const [nicknameErrorState, setNicknameErrorState] = useState(false);
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState("");

  const [nicknameValidityFlag, setNicknameValidityFlag] = useState(false);
  const [nicknameDuplicateFlag, setNicknameDuplicateFlag] = useState(false);

  const nicknameValidityState = !!(nickname && !nicknameValidityFlag);
  const nicknameIsDisabled = !!(!nicknameValidityFlag || nicknameDuplicateFlag);


  const { data, refetch } = useQuery(
    "checkNickname",
    () => fetchNicknameDupicate({ nickname, setNicknameErrorMessage, setNicknameErrorState }),
    { enabled: false, cacheTime: 0 }
  );

  useEffect(() => {
    setIsClickNicknameButton(false);
    if (nicknameValidityState) {
      setNicknameErrorMessage("닉네임은 초성 제외, 2 ~ 20자만 사용 가능합니다.");
      setNicknameErrorState(true);
    } else {
      setNicknameErrorMessage("");
      setNicknameErrorState(false);
    }
  }, [nickname]);

  useEffect(() => {
    if (data !== undefined) {
      setNicknameDuplicateFlag(data)
    }
  }, [data])

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
            error={nicknameErrorState}
            onChange={(e) => {
              setNickname(e.target.value);
              setNicknameValidityFlag(
                checkAuthInputValidity({
                  type: "nickname",
                  authValue: e.target.value,
                })
              );
            }}
          />
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
              {nicknameErrorMessage}
            </Typography>
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
              refetch();
              setIsClickNicknameButton(true)
            }}
          >
            {nicknameDuplicateFlag ? "확인 완료" : "중복 확인"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default NicknameInput;
