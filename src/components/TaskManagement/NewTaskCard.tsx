import { Card, Grid, IconButton, Typography } from '@mui/material';
import theme from '@/theme/theme';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import TaskObj from '@/models/TaskObj';

type TypeProps = {
    onShowTaskModal(type:boolean): void;
    onClick(type:TaskObj|null): void;
}

const NewTaskCard = ({onClick, onShowTaskModal}:TypeProps) => {
    return <div>
        <Card sx={{borderRadius: 4, padding:1, background:theme.palette.secondary.light}} variant="elevation" square={false}>
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            >
            <IconButton onClick={() => {
                onClick(null);
                onShowTaskModal(true);
            }}>
                <AddCircleRoundedIcon fontSize="large"/>
            </IconButton>
            <Typography variant="subtitle1">TASK</Typography>
        </Grid>
        </Card>
    </div>

}

export default NewTaskCard;