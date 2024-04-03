import { Autocomplete, TextField, Paper } from "@mui/material";
import React, { useState } from "react";
import theme from "@/theme/theme";

type ProjectMemberAutocompleteProps = {
  memberUuidList: string[];
  onSelectedMemberChanged(value: string[] | null): void;
};

const ProjectMemberAutocomplete = ({
  memberUuidList,
  onSelectedMemberChanged,
}: ProjectMemberAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string[] | null
  ) => {
    onSelectedMemberChanged(value);
  };

  return (
    <Autocomplete
      disableClearable
      multiple
      options={memberUuidList}
      isOptionEqualToValue={(option, value) => option === value}
      noOptionsText="일치하는 멤버가 없습니다"
      open={isOpen}
      onChange={handleOptionChange}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      getOptionLabel={(option) => option}
      renderOption={(props, option) => <li {...props}>{option}</li>}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            sx: {
              fontSize: "0.9rem",
              height: "40px",
            },
          }}
        />
      )}
      PaperComponent={(props) => (
        <Paper
          {...props}
          sx={{
            "& .MuiAutocomplete-listbox": {
              backgroundColor: theme.palette.background.default,
              color: "black",
              p: 0,
            },
          }}
        />
      )}
      sx={{
        "& .MuiOutlinedInput-root": {
          p: "0px 0px 0px 9px",
        },
      }}
    />
  );
};

export default ProjectMemberAutocomplete;
