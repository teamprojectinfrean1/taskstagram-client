import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import theme from "@/theme/theme";

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
        "& .MuiSelect-select": {
          fontWeight: "bold",
          color: theme.palette.text.secondary,
        },
        "& .MuiSelect-icon": {
          mr: -0.5,
        },
        border: "none",
        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
      }}
    >
      {options.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          sx={{
            fontWeight: "bold",
            color: theme.palette.text.secondary,
          }}
        >
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default DropdownSelect;
