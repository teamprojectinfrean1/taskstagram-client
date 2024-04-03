import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import theme from "@/theme/theme";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TaskObj from "@/models/TaskObj";
import { RawDraftContentState, convertFromRaw } from "draft-js";

type TaskProps = {
  selectedTask: TaskObj;
  onDelete(task: TaskObj): void;
  onShowTaskModal(isModalOpen: boolean): void;
  onSelectedTask(selectedTask: TaskObj): void;
};

const Task = ({
  selectedTask,
  onDelete,
  onShowTaskModal,
  onSelectedTask,
}: TaskProps) => {
  const onClick = () => {
    onShowTaskModal(true);
    onSelectedTask(selectedTask);
  };
  return (
    <Card
      sx={{
        height: "200px",
        borderRadius: 4,
        p: 1,
        boxShadow: 3,
        background: theme.palette.primary.light,
        "&:hover": {
          backgroundColor: theme.palette.secondary.light,
        },
      }}
      variant="elevation"
      square={false}
    >
      <CardHeader
        sx={{
          "&:hover": { cursor: "pointer" },
          "& .MuiCardHeader-content": {
            overflow: "hidden",
          },
        }}
        onClick={onClick}
        action={
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete(selectedTask);
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        }
        title={selectedTask.taskTitle}
        titleTypographyProps={{
          noWrap: true,
          variant: "h6",
          fontWeight: "bold",
        }}
      ></CardHeader>
      <CardContent
        sx={{
          height: "calc(100% - 70px)",
          backgroundColor: theme.palette.background.default,
          borderRadius: 3,
          mx: 1,
          "&:hover": { cursor: "pointer" },
        }}
        onClick={onClick}
      >
        {selectedTask.taskContent && (
          <Typography
            variant="subtitle1"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {/* {convertFromRaw(
              selectedTask.taskContent as RawDraftContentState
            ).getPlainText()} */}
            {selectedTask.taskContent}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Task;
