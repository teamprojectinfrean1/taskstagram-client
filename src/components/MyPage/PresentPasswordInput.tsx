import { TextField } from "@mui/material";

type PresentPasswordInputProps = {
  presentPassword: string;
  setPresentPassword(value: string): void;
};

const PresentPasswordInput = ({
  presentPassword,
  setPresentPassword,
}: PresentPasswordInputProps) => {
  return (
    <TextField
      autoFocus
      type="password"
      fullWidth
      size="small"
      placeholder="현재 비밀번호"
      value={presentPassword}
      onChange={(e) => {
        setPresentPassword(e.target.value);
      }}
    ></TextField>
  );
};

export default PresentPasswordInput;
