import { effectCheck } from "@/utils/authCheck";
import { Box, Typography, OutlinedInput } from "@mui/material";

interface PropsType {
  nickname: string;
  setNickname(nickname: string): void;
  setNicknameFlag(nicknameFlag: boolean): void;
}

const NicknameInput = (props: PropsType) => {
  return (
    <>
      <Typography sx={{ mt: 3, ml: 0.5 }}>Nickname</Typography>
      <OutlinedInput
        type="text"
        fullWidth
        size="small"
        placeholder={"닉네임"}
        error={
          props.nickname &&
          !effectCheck({ type: "nickname", nickname: props.nickname })
            ? true
            : false
        }
        onBlur={(e) => {
          props.setNickname(e.target.value);
          props.setNicknameFlag(
            effectCheck({ type: "nickname", nickname: e.target.value })
          );
        }}
      />
      {props.nickname &&
        !effectCheck({ type: "nickname", nickname: props.nickname }) && (
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
