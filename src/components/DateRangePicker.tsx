import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

type DateRangePickerProps = {
  selectedOptions: [string, string] | null;
  onSelectionChange: (value: string[] | null) => void;
};

const DateRangePicker = ({
  selectedOptions,
  onSelectionChange,
}: DateRangePickerProps) => {
  const handleDateChange = (date: dayjs.Dayjs | null, index: number) => {
    const dateString = date ? dayjs(date).format("YYYY-MM-DD") : "";
    const updatedOptions = [...(selectedOptions || [])];
    updatedOptions[index] = dateString;
    onSelectionChange(updatedOptions.length ? updatedOptions : null);
  };

  return (
    <Box display="flex" gap={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start"
          name="startDate"
          sx={{ flex: 1 }}
          value={selectedOptions?.[0] ? dayjs(selectedOptions[0]) : null}
          onChange={(date) => handleDateChange(date, 0)}
        />
        <DatePicker
          label="End"
          name="endDate"
          sx={{ flex: 1 }}
          value={selectedOptions?.[1] ? dayjs(selectedOptions[1]) : null}
          onChange={(date) => handleDateChange(date, 1)}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DateRangePicker;
