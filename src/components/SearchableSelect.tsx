import { useState } from "react";
import {
  Autocomplete,
  Box,
  InputLabel,
  TextField,
} from "@mui/material";

type SearchableSelectProps = {
  label: string;
  possibleOptions: string[];
  selectedOptions: string | string[] | null;
  onSelectionChange: (value: string | string[]| null) => void;
  multiselect?: boolean;
};

const SearchableSelect = ({
  label,
  possibleOptions,
  selectedOptions,
  onSelectionChange,
  multiselect = false,
}: SearchableSelectProps) => {

  const handleOptionChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | string[] | null
  ) => {
    onSelectionChange(value);
  };

  return (
    <Box>
      <InputLabel htmlFor={label} sx={{ fontWeight: "bold", mb: 1 }}>
        {label}
      </InputLabel>
      <Autocomplete
        value={[]}
        onChange={handleOptionChange}
        options={possibleOptions}
        isOptionEqualToValue={(option, value) => {
          if (multiselect) {
            return Array.isArray(value) && value.includes(option);
          } else {
            return option === value;
          }
        }}
        multiple={multiselect}
        noOptionsText="일치하는 옵션이 없습니다"
        renderInput={(params) => (
          <TextField
            {...params}
            id={label}
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
        renderOption={(props, option) => <li {...props}>{option}</li>}
      />
    </Box>
  );
};

export default SearchableSelect;
