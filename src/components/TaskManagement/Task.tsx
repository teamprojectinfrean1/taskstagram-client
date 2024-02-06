import { Card, CardHeader, IconButton } from '@mui/material';
import theme from '@/theme/theme';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TaskObj from '@/models/TaskObj';

type TypeProps = {
    item:TaskObj;
    onDelete(type:TaskObj): void;
    onShowTaskModal(type:boolean): void;
    onSelectedTask(type:TaskObj): void;
};

const Task = ({item, onDelete, onShowTaskModal, onSelectedTask}:TypeProps) => {
    return <div>
        <Card sx={{borderRadius: 4, padding:1, background:theme.palette.secondary.light}} variant="elevation" square={false}> 
            <CardHeader 
                action={
                    <IconButton onClick={() => onDelete(item)}>
                        <DeleteOutlineIcon />
                    </IconButton>
                } 
                title={item.taskName}>
            </CardHeader>
            <Card sx={{borderRadius: 2, padding:3, '&:hover': {cursor: 'pointer'}}} 
                variant="outlined" 
                onClick={()=>{
                    onShowTaskModal(true);
                    onSelectedTask(item);
                }}>{item.taskExplanation.length > 55 ? item.taskExplanation.substring(0,55).concat("...") : item.taskExplanation}</Card>
            
        </Card>
    </div>
}

export default Task;