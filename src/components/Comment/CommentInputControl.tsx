import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

type CommentInputControlProps = {
  commentBody: string;
  setCommentBody: (value: string) => void;
  renderButton: React.ReactNode;
  handleCancel: () => void;
};
export const CommentInputControl = ({
  commentBody,
  setCommentBody,
  renderButton,
  handleCancel,
}: CommentInputControlProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentBody(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <Stack sx={{ width: "100%" }}>
      <TextField
        fullWidth
        placeholder="내용을 입력해주세요"
        multiline
        maxRows={1000}
        variant="standard"
        className="custom-scrollbar"
        sx={{ m: "auto" }}
        value={commentBody}
        onChange={handleChange}
        onFocus={handleFocus}
      />
      {isFocused && (
        <Box
          display="flex"
          gap={1}
          sx={{
            alignSelf: "end",
            my: 1,
            "& .MuiButtonBase-root": { px: 2, py: 0.5, borderRadius: 10 },
          }}
        >
          <Button
            onClick={() => {
              setIsFocused(false);
              handleCancel();
            }}
          >
            취소
          </Button>
          {renderButton}
        </Box>
      )}
    </Stack>
  );
};
