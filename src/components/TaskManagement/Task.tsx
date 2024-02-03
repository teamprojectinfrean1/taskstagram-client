import { Card, CardHeader, IconButton, Typography } from '@mui/material';
import theme from '@/theme/theme';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type TypeProps = {
    key:string;
    taskName: string;
    taskExplanation: string,
    onSettingBtnClick: () => void;
    onShowTaskModal(type:boolean): void;
    onSelectTaskId(type:string): void;
};

const Task = ({key, taskName, taskExplanation, onSettingBtnClick, onShowTaskModal, onSelectTaskId}:TypeProps) => {
    return <div>
        <Card sx={{width:240, height:240, padding:1, background:theme.palette.secondary.light}} variant="elevation" square={false}> 
            <CardHeader 
                action={
                    <IconButton aria-label='settings' onClick={onSettingBtnClick}>
                        <MoreVertIcon />
                    </IconButton>
                } 
                title={taskName}>
            </CardHeader>
            <Card sx={{width:190, height:120, padding:3}} 
                variant="outlined" 
                onClick={()=>{
                    onShowTaskModal(true);
                    onSelectTaskId(key);
                }}>{taskExplanation}</Card>
            
        </Card>
    </div>
}

export default Task;