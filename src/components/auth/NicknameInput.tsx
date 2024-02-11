import { checkAuthInputValidity } from "@/utils/authCheck";
import { Box, Typography, OutlinedInput } from "@mui/material";

type PropsType = {
  nickname: string;
  setNickname(nickname: string): void;
  setNicknameFlag(nicknameFlag: boolean): void;
}

const NicknameInput = ({
  nickname,
  setNickname,
  setNicknameFlag,
}: PropsType) => {
  return (
    <>
      <Typography sx={{ mt: 3, ml: 0.5 }}>Nickname</Typography>
      <OutlinedInput
        type="text"
        fullWidth
        size="small"
        placeholder={"닉네임"}
        value={nickname}
        error={
          nickname && !checkAuthInputValidity({ type: "nickname", nickname })
            ? true
            : false
        }
        onBlur={(e) => {
          setNickname(e.target.value);
          setNicknameFlag(
            checkAuthInputValidity({
              type: "nickname",
              nickname: e.target.value,
            })
          );
        }}
      />
      {nickname && !checkAuthInputValidity({ type: "nickname", nickname }) && (
        <Box className="error-font">
          <Typography sx={{ fontWeight: "bold", fontSize: "11px" }}>
            닉네임은 초성 금지,2글자 이상, 10글자 이하여야 합니다.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default NicknameInput;
