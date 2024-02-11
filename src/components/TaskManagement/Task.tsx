import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import theme from '@/theme/theme';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TaskObj from '@/models/TaskObj';

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
        <Card sx={{borderRadius: 4, p:1, background:theme.palette.secondary.light}} variant="elevation" square={false}> 
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
            <CardContent sx={{backgroundColor: "white", borderRadius: 3, '&:hover': {cursor: 'pointer'}}} 
                onClick={onClick}>
                <Typography variant="subtitle1">
                    {selectedTask.taskExplanation.length > 55 ? selectedTask.taskExplanation.substring(0,55).concat("...") : selectedTask.taskExplanation}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Task;