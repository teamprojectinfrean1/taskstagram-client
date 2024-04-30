import UserAvatar from "@/components/UserAvatar";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { commentIdSelectedToDeleteState } from "@/stores/commentStore";
import Spinner from "@/components/Spinner";
import { userInfoState } from "@/stores/userStore";
import { CommentInputControl } from "@/components/Comment/CommentInputControl";
import PrimaryButton from "@/components/PrimaryButton";
import useFeedbackHandler from "@/hooks/useFeedbackHandler";
import { useMutation } from "react-query";
import { updateComment } from "@/apis/commentApi";
import { issueIdToShowInModalState } from "@/stores/issueStore";

type CommentCardProps = {
  comment: ExistingComment;
};

const CommentCard = ({ comment }: CommentCardProps) => {
  const { memberId: loggedInMemberId } = useRecoilValue(userInfoState);
  const issueId = useRecoilValue(issueIdToShowInModalState);
  const setCommentIdSelectedToDelete = useSetRecoilState(
    commentIdSelectedToDeleteState
  );
  const {
    commentId,
    body,
    updatedAt,
    userId: commentWriterId,
    userNickname,
    userProfileImage,
  } = comment;

  const [editMode, setEditMode] = useState<boolean>(false);
  const [updatedCommentBody, setUpdatedCommentBody] = useState<string>(body);

  const isLoggedInUserCommentWriter = loggedInMemberId === commentWriterId;


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSettingsDropdown = () => {
    setAnchorEl(null);
  };

  const handleCommentEdit = () => {
    handleCloseSettingsDropdown();
    setEditMode(true);
  };

  const handleCommentDelete = () => {
    handleCloseSettingsDropdown();
    setCommentIdSelectedToDelete(commentId);
  };

  const {
    mutate: executeUpdateComment,
    data,
    isLoading: isUpdatingComment,
    isSuccess,
    isError,
  } = useMutation(() =>
    updateComment({
      commentId,
      comment: {
        writerId: loggedInMemberId,
        issueId: issueId!,
        body: updatedCommentBody,
      },
    })
  );

  useFeedbackHandler({
    isError,
    errorMessage:
      "댓글을 수정하는 중 문제가 발생했습니다. 나중에 다시 시도해 주십시오.",
    isSuccess,
    successMessage: "댓글이 수정되었습니다.",
    unconditionalExecute: () => setEditMode(false),
  });

  if (isUpdatingComment) {
    return <Spinner />;
  }

  return (
    <Box display="flex" gap={4}>
      <UserAvatar sx={{ width: 50, height: 50 }} imageUrl={userProfileImage} />
      {editMode ? (
        <CommentInputControl
          commentBody={updatedCommentBody}
          setCommentBody={setUpdatedCommentBody}
          renderButton={
            <PrimaryButton
              disabled={isUpdatingComment}
              onClick={() => executeUpdateComment}
            >
              저장
            </PrimaryButton>
          }
        />
      ) : (
        <Stack
          sx={{
            width: "100%",
            py: 1,
            px: 3,
            border: `1px solid ${grey[400]}`,
            borderRadius: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>{userNickname}</Typography>
            {isLoggedInUserCommentWriter && (
              <>
                <IconButton
                  size="small"
                  edge="end"
                  color="inherit"
                  aria-label="comment-settings"
                  onClick={handleSettingsClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseSettingsDropdown}
                  sx={{
                    "& .MuiButtonBase-root": {
                      px: 2,
                    },
                    "& .MuiSvgIcon-root": {
                      mr: 1,
                    },
                  }}
                >
                  <MenuItem onClick={handleCommentEdit}>
                    <EditOutlinedIcon fontSize="small" /> 수정
                  </MenuItem>
                  <MenuItem onClick={handleCommentDelete}>
                    <DeleteOutlineOutlinedIcon fontSize="small" /> 삭제
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
          <Typography>{body}</Typography>
          <Typography
            variant="subtitle2"
            textAlign="right"
            sx={{ color: grey[600], mr: 1 }}
          >
            {updatedAt.split("T")[0]}
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default CommentCard;
