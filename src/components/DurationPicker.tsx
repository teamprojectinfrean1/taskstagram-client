import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

type DurationPickerProps = {
  selectedStartDate: string | null;
  selectedEndDate: string | null;
  onStartDateSelectionChange: (stringDateValue: string | null) => void;
  onEndDateSelectionChange: (stringDateValue: string | null) => void;
};

const DurationPicker = ({
  selectedStartDate,
  selectedEndDate,
  onStartDateSelectionChange,
  onEndDateSelectionChange,
}: DurationPickerProps) => {
  const handleStartDateChange = (startDate: Dayjs | null) => {
    const dateString = startDate ? dayjs(startDate).format("YYYY-MM-DD") : null;
    onStartDateSelectionChange(dateString);
  };

  const handleEndDateChange = (endDate: Dayjs | null) => {
    const dateString = endDate ? dayjs(endDate).format("YYYY-MM-DD") : null;
    onEndDateSelectionChange(dateString);
  };

  return (
    <Box display="flex" gap={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start"
          name="startDate"
          format="YYYY/MM/DD"
          sx={{ flex: 1 }}
          value={selectedStartDate ? dayjs(selectedStartDate) : null}
          onChange={(date) => handleStartDateChange(date)}
          slotProps={{
            textField: { size: "small" },
          }}
        />
        <DatePicker
          label="End"
          name="endDate"
          format="YYYY/MM/DD"
          sx={{ flex: 1 }}
          value={selectedEndDate ? dayjs(selectedEndDate) : null}
          onChange={(date) => handleEndDateChange(date)}
          slotProps={{ textField: { size: "small" } }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DurationPicker;
