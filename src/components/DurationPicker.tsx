import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Duration } from "@/models/Issue";

type DurationPickerProps = {
  selectedOptions: Duration;
  onSelectionChange: (value: Duration | null) => void;
};

const DurationPicker = ({
  selectedOptions,
  onSelectionChange,
}: DurationPickerProps) => {
  const handleDateChange = (date: dayjs.Dayjs | null, isStartDate: boolean) => {
    const dateString = date ? dayjs(date).format("YYYY-MM-DD") : null;
    const updatedOptions = {
      ...selectedOptions,
      ...(isStartDate ? { startDate: dateString } : { endDate: dateString }),
    };

    onSelectionChange((updatedOptions.startDate || updatedOptions.endDate) ? updatedOptions : null);
  };

  return (
    <Box display="flex" gap={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start"
          name="startDate"
          sx={{ flex: 1 }}
          value={selectedOptions?.startDate ? dayjs(selectedOptions.startDate) : null}
          onChange={(date) => handleDateChange(date, true)}
        />
        <DatePicker
          label="End"
          name="endDate"
          sx={{ flex: 1 }}
          value={selectedOptions?.endDate ? dayjs(selectedOptions.endDate) : null}
          onChange={(date) => handleDateChange(date, false)}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DurationPicker;
