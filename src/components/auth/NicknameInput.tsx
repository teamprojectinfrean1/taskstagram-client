import theme from "@/theme/theme";
import { checkAuthInputValidity } from "@/utils/authCheck";
import { Typography, Grid, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { checkNicknameExistence } from "@/apis/user/checkExistence";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { signupInfoState } from "@/stores/authStore";

type NicknameInputProps = {
  nickname: string;
  setNickname(nickname: string): void;
  isNicknameDuplicate: boolean;
  setIsNicknameDuplicate(value: boolean): void;
};

const NicknameInput = ({
  nickname,
  setNickname,
  isNicknameDuplicate,
  setIsNicknameDuplicate,
}: NicknameInputProps) => {
  const [errorState, setErrorState] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");

  // 닉네임 유효성 검사 변수
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  // 닉네임 유효성 검사 상태
  const validState = !!(nickname && !isNicknameValid);
  // 닉네임 중복 검사 상태
  const disabledState = !!(!isNicknameValid || isNicknameDuplicate);

  const { data, isLoading, error, refetch } = useQuery(
    "checkNickname",
    () => checkNicknameExistence(nickname),
    {
      enabled: false,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    setIsNicknameDuplicate(!!data);
    if (!!!data) {
      setShowErrorMessage(
        "이미 가입된 닉네임입니다. 다른 닉네임을 입력해주세요."
      );
      setErrorState(true);
    } else {
      setShowErrorMessage("");
      setErrorState(false);
    }
  }, [data]);

  useEffect(() => {
    if (validState) {
      setShowErrorMessage(
        "닉네임은 초성 금지. 2글자 이상 20글자이하여야합니다."
      );
      setErrorState(true);
    } else {
      setShowErrorMessage("");
      setErrorState(false);
    }
  }, [nickname]);

  useEffect(() => {
    if (isLoading) {
      setShowErrorMessage("요청 중입니다. 잠시만 기다려주세요...");
      setErrorState(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (error === "Network Error") {
      setShowErrorMessage(
        "네트워크 에러가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
      setErrorState(true);
    }
  }, [error]);

  const signupInfo = useRecoilValue(signupInfoState);

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
