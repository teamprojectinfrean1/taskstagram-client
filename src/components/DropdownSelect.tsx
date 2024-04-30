import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

type Option = {
  value: string;
  label: string;
};

type DropdownSelectProps = {
  selectedOption: IssueSearchFilter;
  handleFilterChange: (value: IssueSearchFilter) => void;
  options: Option[];
};

const DropdownSelect = ({
  selectedOption,
  handleFilterChange,
  options,
}: DropdownSelectProps) => {
  return (
    <Select
      id="select-option"
      value={selectedOption}
      onChange={(event: SelectChangeEvent) => {
        handleFilterChange(event.target.value as IssueSearchFilter);
      }}
      label="Option"
      sx={{
        "&.MuiSelect-select": {
          pl: 0,
        },
        "& .MuiSelect-icon": {
          mr: -.5,
        },
        border: "none",
        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default DropdownSelect;
