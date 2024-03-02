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
        <Card 
            onClick={() => {
                onClick(null);
                onShowTaskModal(true);
            }}
            sx={{
                height:"200px",
                borderRadius: 4,
                boxShadow:3,
                p:1, 
                background:theme.palette.primary.light,
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                "&:hover": {
                    backgroundColor: theme.palette.secondary.light,
                    cursor: 'pointer'
                }}} 
            variant="elevation" 
            square={false}>
            <AddCircleRoundedIcon fontSize="large"/>
            <Typography variant="subtitle1" sx={{textAlign:"center", fontWeight:"bold"}}>TASK</Typography>
        </Card>
    )

}

export default NewTask;