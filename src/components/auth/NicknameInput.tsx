import theme from "@/theme/theme";
import { checkAuthInputValidity } from "@/utils/authCheck";
import { Typography, Grid, Button, TextField } from "@mui/material";
import { useState } from "react";
import { checkNicknameExistence } from "@/apis/auth";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { signupInfoState } from "@/stores/authStore";

type NicknameInputProps = {
  nickname: string;
  setNickname(nickname: string): void;
};

const NicknameInput = ({ nickname, setNickname }: NicknameInputProps) => {
  const [errorState, setErrorState] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");

  // 닉네임 유효성 검사 변수
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  // 닉네임 중복 검사 변수
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);
  // 닉네임 유효성 검사 상태
  const validState = !!(nickname && !isNicknameValid);
  // 닉네임 중복 검사 상태
  const disabledState = !!(!isNicknameValid || isNicknameDuplicate);

  const { data, refetch } = useQuery(
    "checkNickname",
    () => checkNicknameExistence(nickname),
    {
      enabled: false,
      cacheTime: 0,
      onSuccess: (data) => {
        setIsNicknameDuplicate(data);
        if (!data) {
          setShowErrorMessage(
            "이미 가입된 닉네임입니다. 다른 닉네임을 입력해주세요."
          );
          setErrorState(true);
        } else {
          setShowErrorMessage("");
          setErrorState(false);
        }
      },
    }
  );

  const signupInfo = useRecoilValue(signupInfoState)
    
  return (
    <>
      <Typography sx={{ mt: 4, ml: 0.5 }}>Nickname</Typography>
      <Grid container spacing={2}>
        <Grid item xs={9}>
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
            type="text"
            fullWidth
            size="small"
            placeholder={"닉네임"}
            value={nickname}
            error={errorState}
            helperText={showErrorMessage}
            disabled={isNicknameDuplicate}
            onChange={(e) => {
              setNickname(e.target.value);
              setIsNicknameValid(
                checkAuthInputValidity({
                  type: "nickname",
                  authValue: e.target.value,
                })
              );
            }}
          />
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
            disabled={disabledState}
            onClick={() => {
              refetch();
            }}
          >
            {isNicknameDuplicate ? "확인 완료" : "중복 확인"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default NicknameInput;
