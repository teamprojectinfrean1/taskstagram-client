import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import theme from "@/theme/theme";
import CommentUpdateButton from "./CommentUpdateButton";
import CommentCreateButton from "./CommentCreateButton";
import { useRecoilValue } from "recoil";
import { issueIdToShowInModalState } from "@/stores/issueStore";

type CommentEditorProps = {
  existingComment?: Partial<ExistingComment>;
  endEditMode: () => void;
  userId: string;
};

const CommentEditor = ({
  existingComment,
  endEditMode,
  userId,
}: CommentEditorProps) => {
  const issueIdToShowInModal = useRecoilValue(issueIdToShowInModalState);

  const [newCommentBody, setNewCommentBody] = useState(
    existingComment?.commentBody || ""
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCommentBody(event.target.value);
  };

  const handleCancel = () => {
    if (endEditMode) endEditMode();
  };

  const handleSave = () => {
    if (endEditMode) endEditMode();
  };

  const newComment: NewOrUpdatedComment = {
    writerId: userId,
    issueId: issueIdToShowInModal!,
    commentBody: newCommentBody,
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
        value={newCommentBody}
        onChange={handleChange}
      />
      <Box
        display="flex"
        gap={1}
        sx={{
          alignSelf: "end",
          my: 1,
          "& .MuiButtonBase-root": { px: 2, py: 0.5, borderRadius: 10 },
        }}
      >
        <Button onClick={handleCancel}>취소</Button>
        {existingComment ? (
          <CommentUpdateButton
            commentId={existingComment.commentId!}
            comment={newComment}
            endEditMode={endEditMode}
          />
        ) : (
          <CommentCreateButton comment={newComment} endEditMode={endEditMode} />
        )}
      </Box>
    </Stack>
  );
};

export default CommentEditor;
