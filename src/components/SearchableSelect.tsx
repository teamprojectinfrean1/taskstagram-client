import { useState } from "react";
import { Autocomplete, Box, InputLabel, Paper, TextField } from "@mui/material";
import theme from "@/theme/theme";

type SearchableSelectProps = {
  label: string;
  possibleOptions: string[];
  selectedOptions: string | string[] | null;
  onSelectionChange: (value: string | string[] | null) => void;
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
    console.log(value);
    onSelectionChange(value);
  };

  return (
    <Box>
      <InputLabel htmlFor={`input-${label}`} sx={{ fontWeight: "bold", mb: 1 }}>
        {label}
      </InputLabel>
      <Autocomplete
        value={selectedOptions ?? (multiselect ? [] : null)}
        onChange={handleOptionChange}
        options={possibleOptions}
        isOptionEqualToValue={(option, value) => option === value}
        multiple={multiselect}
        noOptionsText="일치하는 옵션이 없습니다"
        PaperComponent={({ children }) => (
          <Paper style={{ backgroundColor: theme.palette.background.default }}>{children}</Paper>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            id={`input-${label}`}
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
        renderOption={(props, option) => (
          <li
            {...props}
          >
            {option}
          </li>
        )}
      />
    </Box>
  );
};

export default SearchableSelect;
