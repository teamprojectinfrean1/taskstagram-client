import { Stack } from '@mui/material';
import TaskObj from "@/models/TaskObj";
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type TaskDurationDatePickerProps = {
    startDate: Dayjs | null,
    endDate: Dayjs | null,
    onChangeStartDate(startDate: Dayjs | null) : void,
    onChangeEndDate(endDate: Dayjs | null) : void
}

const TaskDurationDatePicker = ({startDate, endDate, onChangeStartDate, onChangeEndDate}:TaskDurationDatePickerProps) => {
    return (
        <Stack direction="row" spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Start" name="startDate" format="YYYY-MM-DD" value={startDate} onChange={onChangeStartDate}/>
                </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="End" name="endDate" format="YYYY-MM-DD" value={endDate} onChange={onChangeEndDate}/>
                </DemoContainer>
            </LocalizationProvider>
        </Stack>
    )
}

export default TaskDurationDatePicker;