import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Tooltip,
  Box,
} from "@mui/material";
import theme from "@/theme/theme";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { RawDraftContentState, convertFromRaw } from "draft-js";
import { green } from "@mui/material/colors";

type TaskProps = {
  selectedTask: Task;
  onDelete(task: Task): void;
  onShowTaskModal(isModalOpen: boolean): void;
  onSelectedTask(selectedTask: Task): void;
};

const TaskTicket = ({
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
        background: theme.palette.background.paper,
        "&:hover": {
          backgroundColor: "#C2C6D6",
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
          "& .MuiCardHeader-avatar": {
            marginRight: "7px",
          },
        }}
        avatar={
          <Tooltip
            title={selectedTask.taskStatus}
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -5],
                    },
                  },
                ],
              },
            }}
          >
            <Box
              sx={{
                bgcolor:
                  selectedTask.taskStatus === "진행 중"
                    ? green[400]
                    : "#a4cef8",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
              }}
            ></Box>
          </Tooltip>
        }
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

export default TaskTicket;
