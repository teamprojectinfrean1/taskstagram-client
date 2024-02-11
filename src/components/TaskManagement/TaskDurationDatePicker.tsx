import { Stack } from '@mui/material';
import TaskObj from "@/models/TaskObj";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type TaskDurationDatePickerProps = {
}

const TaskDurationDatePicker = ({}:TaskDurationDatePickerProps) => {
    return (
        <Stack direction="row" spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Start" name="startDate" />
                </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="End" name="startDate" />
                </DemoContainer>
            </LocalizationProvider>
        </Stack>
    )
}

export default TaskDurationDatePicker;