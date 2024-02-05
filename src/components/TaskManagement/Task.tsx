import { Grid, Card, CardHeader, IconButton, Typography } from '@mui/material';
import theme from '@/theme/theme';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TaskObj from '@/models/TaskObj';
import { useRecoilState } from 'recoil';
import { taskListState } from '@/stores/Store';
import React from 'react';

type TypeProps = {
    item:TaskObj;
    taskName: string;
    taskExplanation: string,
    onSettingBtnClick: () => void;
    onShowTaskModal(type:boolean): void;
    onSelectTask(type:TaskObj): void;
};

const replaceItemAtIndex = (arr:TaskObj[], index:number, newValue:TaskObj) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}


const Task = ({item, taskName, taskExplanation, onSettingBtnClick, onShowTaskModal, onSelectTask}:TypeProps) => {
    const [taskList, setTaskList] = useRecoilState(taskListState);
    const index = taskList.findIndex((listItem) => listItem === item);

    return <div>
        <Card sx={{borderRadius: 4, padding:1, background:theme.palette.secondary.light}} variant="elevation" square={false}> 
            <CardHeader 
                action={
                    <IconButton aria-label='settings' onClick={onSettingBtnClick}>
                        <MoreVertIcon />
                    </IconButton>
                } 
                title={taskName}>
            </CardHeader>
            <Card sx={{borderRadius: 2, padding:3, '&:hover': {cursor: 'pointer'}}} 
                variant="outlined" 
                onClick={(e)=>{
                    onShowTaskModal(true);
                    onSelectTask(item);
                }}>{taskExplanation}</Card>
            
        </Card>
    </div>
}

export default Task;