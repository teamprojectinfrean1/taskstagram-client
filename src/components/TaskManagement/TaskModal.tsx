import {
  Modal,
  Grid,
  Box,
  Typography,
  TextField,
  Autocomplete,
} from "@mui/material";
import DateRangePicker from "@/components/DateRangePicker";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { taskListState } from "@/stores/Store";
import TaskObj from "@/models/TaskObj";

type TaskModalProps = {
  selectedTask: TaskObj;
  isOpen: boolean;
  onAdd(task: TaskObj): void;
  onReplace(currentTask: TaskObj, newTask: TaskObj): void;
  onCloseModal: () => void;
};

type User = {
  id: string;
  label: string;
  name: string;
};

const users: User[] = [
  { id: "AD", label: "Andorra", name: "마효리" },
  { id: "AF", label: "Afghanistan", name: "정석호" },
  { id: "AI", label: "Anguilla", name: "박수빈" },
];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const TaskModal = ({
  selectedTask,
  isOpen,
  onAdd,
  onReplace,
  onCloseModal,
}: TaskModalProps) => {
  const [taskList, setTaskList] = useRecoilState(taskListState);
  const [taskNameValue, setTaskNameValue] = useState("");
  const [taskExplanationValue, setTaskExplanationValue] = useState("");

  useEffect(() => {
    setTaskNameValue(selectedTask ? selectedTask.taskName : "");
    setTaskExplanationValue(selectedTask ? selectedTask.taskExplanation : "");
  }, [selectedTask]);

  //Task명 input 변경이벤트
  const onTaskNameChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskNameValue(e.target.value);
  };

  //Task 설명 input 변경이벤트
  const onTaskExplanationChanged = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTaskExplanationValue(e.target.value);
  };

  //모달창 닫힘 이벤트
  const onModalClose = () => {
    if (!selectedTask) {
      //새로운 task 생성시
      if (taskNameValue) {
        //일단 제목 입력시에만 생성되도록
        onAdd({
          taskId: taskList.length + "s", //임시 Id
          taskName: taskNameValue,
          taskExplanation: taskExplanationValue,
          isSelected: false,
        });
      }

      setTaskNameValue("");
      setTaskExplanationValue("");
    } else {
      //이미 생성된 Task
      onReplace(selectedTask, {
        ...selectedTask,
        taskName: taskNameValue,
        taskExplanation: taskExplanationValue,
      });
    }

    onCloseModal();
  };

  return (
    <Modal open={isOpen} onClose={onModalClose}>
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Box sx={{ display: "grid", gap: 1 }}>
              <Typography>Task명</Typography>
              <TextField
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                }}
                color="secondary"
                value={taskNameValue}
                onChange={onTaskNameChanged}
              />
              <Typography>내용</Typography>
              <TextField
                fullWidth
                sx={{
                  "& .MuiInputBase-root": { height: 120 },
                  gridColumn: "1",
                  gridRow: "span 4",
                }}
                color="secondary"
                value={taskExplanationValue}
                onChange={onTaskExplanationChanged}
              />
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ display: "grid", gap: 1 }}>
              <Typography>담당자</Typography>
              <Autocomplete
                id="country-select-demo"
                sx={{ width: 300 }}
                options={users}
                autoHighlight
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      srcSet={`https://flagcdn.com/w40/${option.id.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${option.id.toLowerCase()}.png`}
                      alt=""
                    />
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
              />
              <Typography>기간</Typography>
              {/* <DateRangePicker /> */}
              <Typography>하위 이슈</Typography>
              <TextField color="secondary" focused />
              <Typography>수정/삭제 권한</Typography>
              <TextField color="secondary" focused />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default TaskModal;
