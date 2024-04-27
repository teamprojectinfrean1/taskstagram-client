import UserAvatar from "@/components/UserAvatar";
import CommentEditor from "@/components/Comment/CommentEditor";
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
import { useSetRecoilState } from "recoil";
import { commentIdSelectedToDeleteState } from "@/stores/commentStore";

type CommentCardProps = {
  comment: ExistingComment;
};

const CommentCard = ({ comment }: CommentCardProps) => {
  const setCommentIdSelectedToDelete = useSetRecoilState(
    commentIdSelectedToDeleteState
  );
  const [editMode, setEditMode] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const {
    commentId,
    commentBody,
    lastModifiedDate,
    userId,
    userNickname,
    userProfileImage,
  } = comment;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSettingsDropdown = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleCloseSettingsDropdown();
    setEditMode(true);
  };

  const handleDelete = () => {
    handleCloseSettingsDropdown();
    setCommentIdSelectedToDelete(commentId);
  };

  return (
    <Box display="flex" gap={4}>
      <UserAvatar sx={{ width: 50, height: 50 }} imageUrl={userProfileImage} />
      {editMode ? (
        <CommentEditor
          endEditMode={() => setEditMode(false)}
          existingComment={{ commentId, commentBody }}
          userId={userId}
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
            <IconButton
              size="small"
              edge="end"
              color="inherit"
              aria-label="comment-settings"
              onClick={handleClick}
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
              <MenuItem onClick={handleEdit}>
                <EditOutlinedIcon fontSize="small" /> 수정
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <DeleteOutlineOutlinedIcon fontSize="small" /> 삭제
              </MenuItem>
            </Menu>
          </Box>
          <Typography>{commentBody}</Typography>
          <Typography
            variant="subtitle2"
            textAlign="right"
            sx={{ color: grey[600], mr: 1 }}
          >
            {lastModifiedDate}
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default CommentCard;
