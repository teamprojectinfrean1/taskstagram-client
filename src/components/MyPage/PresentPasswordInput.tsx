import { TextField } from "@mui/material";
import theme from "@/theme/theme";

type PresentPasswordInputProps = {
  presentPassword: string;
  setPresentPassword(value: string): void;
  isError: boolean;
};

const PresentPasswordInput = ({
  presentPassword,
  setPresentPassword,
  isError,
}: PresentPasswordInputProps) => {
  return (
    <TextField
      sx={{
        "& .MuiFormHelperText-root": {
          ml: 1,
          fontSize: "11px",
          fontWeight: "bold",
          color: theme.palette.error.main,
        },
      }}
      autoFocus
      type="password"
      fullWidth
      size="small"
      placeholder="현재 비밀번호"
      error={isError}
      helperText={
        isError && "현재 비밀번호가 일치하지 않습니다. 비밀번호를 확인해주세요."
      }
      value={presentPassword}
      onChange={(e) => {
        setPresentPassword(e.target.value);
      }}
    ></TextField>
  );
};

export default PresentPasswordInput;
