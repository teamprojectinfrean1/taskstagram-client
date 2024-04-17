import React from "react";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DropdownSelect from "@/components/DropdownSelect";
import theme from "@/theme/theme";

type SearchWithDropdownFilterProps = {
  searchParams: IssueSearchParams;
  handleSearchParamsChange: (
    key: keyof IssueSearchParams,
    value: string
  ) => void;
};

const SearchWithDropdownFilter = ({
  searchParams,
  handleSearchParamsChange,
}: SearchWithDropdownFilterProps) => {
  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchParamsChange("keyword", event.target.value);
  };

  const handleFilterChange = (value: IssueSearchFilter) => {
    handleSearchParamsChange("filter", value);
  };

  return (
    <TextField
      variant="outlined"
      value={searchParams.keyword}
      onChange={handleKeywordChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Box sx={{ minWidth: 100 }}>
              <DropdownSelect
                selectedOption={searchParams.filter}
                handleFilterChange={handleFilterChange}
                options={[
                  { value: "Issue", label: "이슈" },
                  { value: "Task", label: "태스크" },
                  { value: "Assignee", label: "담당자" },
                ]}
              />
            </Box>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => {}}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiInputBase-root": { px: 0 },
        "& .MuiOutlinedInput-root": {
          backgroundColor: theme.palette.background.default,
        },
        "& .MuiOutlinedInput-input": {
          py: 1.5,
          mx: 0,
        },
      }}
      fullWidth
    />
  );
};

export default SearchWithDropdownFilter;
