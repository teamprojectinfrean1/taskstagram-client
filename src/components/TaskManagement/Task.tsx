import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import theme from '@/theme/theme';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TaskObj from '@/models/TaskObj';
import { RawDraftContentState, convertFromRaw } from 'draft-js';

type TaskProps = {
    selectedTask:TaskObj;
    onDelete(task:TaskObj): void;
    onShowTaskModal(isModalOpen:boolean): void;
    onSelectedTask(selectedTask:TaskObj): void;
};

const Task = ({selectedTask, onDelete, onShowTaskModal, onSelectedTask}:TaskProps) => {
    const onClick = () => {
        onShowTaskModal(true);
        onSelectedTask(selectedTask);
    }
    return (
        <Card sx={{height:"200px", borderRadius: 4, p:1, background:theme.palette.secondary.light}} variant="elevation" square={false}> 
            <CardHeader
                sx={{'&:hover': {cursor: 'pointer'}}}
                onClick={onClick}
                action={
                    <IconButton onClick={(e) => {
                        e.stopPropagation();
                        onDelete(selectedTask);
                    }}>
                        <DeleteOutlineIcon />
                    </IconButton>
                } 
                title={selectedTask.taskName}>
            </CardHeader>
            <CardContent sx={{height:"calc(100% - 65px)", backgroundColor: "white", borderRadius: 3, '&:hover': {cursor: 'pointer'}}} 
                onClick={onClick}>
                {selectedTask.taskExplanation && 
                    <Typography variant="subtitle1">
                        {convertFromRaw(selectedTask.taskExplanation as RawDraftContentState).getPlainText().length > 55 ? 
                            convertFromRaw(selectedTask.taskExplanation as RawDraftContentState).getPlainText().substring(0,55).concat("...") : 
                            convertFromRaw(selectedTask.taskExplanation as RawDraftContentState).getPlainText()}
                    </Typography>}
            </CardContent>
        </Card>
    )
}

export default Task;