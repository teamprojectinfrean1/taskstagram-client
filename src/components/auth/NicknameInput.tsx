import theme from "@/theme/theme";
import { checkAuthInputValidity } from "@/utils/authCheck";
import { Typography, OutlinedInput } from "@mui/material";

type PropsType = {
  nickname: string;
  nicknameFlag: boolean;
  setNickname(nickname: string): void;
  setNicknameFlag(nicknameFlag: boolean): void;
};

const NicknameInput = ({
  nickname,
  nicknameFlag,
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
        error={nickname && !nicknameFlag ? true : false}
        onChange={(e) => {
          setNickname(e.target.value);
          setNicknameFlag(
            checkAuthInputValidity({
              type: "nickname",
              authValue: e.target.value,
            })
          );
        }}
      />
      {nickname && !nicknameFlag && (
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
          닉네임은 초성 금지,2글자 이상, 10글자 이하여야 합니다.
        </Typography>
      )}
    </>
  );
};

export default NicknameInput;
