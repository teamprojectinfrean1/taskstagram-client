import { CardHeader, IconButton, Paper, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import theme from '@/theme/theme';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type TypeProps = {
    taskName: string;
    taskExplanation: string,
    onSettingBtnClick: () => void;
};

const onTaskPaperClick = () => console.log("taskpaper clicked");

const TaskCard = styled(Card)(() => ({
    width: 240,
    height: 240,
    padding: 5,
    background: theme.palette.secondary.light
  }));

const TaskPaper = styled(Paper)(() => ({
    width: 200,
    height: 120,
    padding: 18,
    textAlign: 'left',
  }));

const Task = ({taskName, taskExplanation, onSettingBtnClick}:TypeProps) => {
    return <div>
        <TaskCard variant="elevation" square={false}> 
            <CardHeader 
                action={
                    <IconButton aria-label='settings' onClick={onSettingBtnClick}>
                        <MoreVertIcon />
                    </IconButton>
                } 
                title={taskName}></CardHeader>
            <TaskPaper variant="outlined" onClick={onTaskPaperClick}>{taskExplanation}</TaskPaper>
        </TaskCard>
    </div>
}

export default Task;