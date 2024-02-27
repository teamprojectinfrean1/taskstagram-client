import { Card, IconButton, Typography } from '@mui/material';
import theme from '@/theme/theme';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import TaskObj from '@/models/TaskObj';

type NewTaskProps = {
    onShowTaskModal(isModalOpen:boolean): void;
    onClick(task:TaskObj|null): void;
}

const NewTask = ({onClick, onShowTaskModal}:NewTaskProps) => {
    return (
        <Card sx={{borderRadius: 4, 
                p:1, 
                background:theme.palette.secondary.light,
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center"}} 
            variant="elevation" 
            square={false}>
            <IconButton onClick={() => {
                onClick(null);
                onShowTaskModal(true);
            }}>
                <AddCircleRoundedIcon fontSize="large"/>
            </IconButton>
            <Typography variant="subtitle1" sx={{textAlign:"center"}}>TASK</Typography>
        </Card>
    )

}

export default NewTask;