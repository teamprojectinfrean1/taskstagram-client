import { Card, Box, Grid, IconButton, Typography } from '@mui/material';
import theme from '@/theme/theme';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

type TypeProps = {
    onShowTaskModal(type:boolean): void;
}

const NewTaskCard = ({onShowTaskModal}:TypeProps) => {
    return <div>
        <Card sx={{borderRadius: 4, padding:1, background:theme.palette.secondary.light}} variant="elevation" square={false}>
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            >
            <IconButton aria-label='settings' onClick={() => onShowTaskModal(true)}>
                <AddCircleRoundedIcon fontSize="large"/>
            </IconButton>
            <Typography variant="subtitle1">TASK</Typography>
        </Grid>
        </Card>
    </div>

}

export default NewTaskCard;