import React from "react";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DropdownSelect from "@/components/DropdownSelect";
import theme from "@/theme/theme";

type SearchWithDropdownFilterProps = {
  handleSearchParamsChange: (
    key: keyof IssueSearchParams,
    value: string
  ) => void;
  triggerSearch: () => void;
  searchParams: IssueSearchParams;
};

const SearchWithDropdownFilter = ({
  handleSearchParamsChange,
  triggerSearch,
  searchParams,
}: SearchWithDropdownFilterProps) => {
  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchParamsChange("keyword", event.target.value);
  };

  const handleFilterChange = (value: IssueSearchFilter) => {
    handleSearchParamsChange("filter", value);
  };

  const executeIssueSearch = (
    event:
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (
      (event as React.KeyboardEvent<HTMLDivElement>).key === "Enter" ||
      event.type === "click"
    ) {
      event.preventDefault();
      if (searchParams.keyword.trim().length > 0) {
        triggerSearch();
      }
    }
  };

  return (
    <TextField
      variant="outlined"
      value={searchParams.keyword}
      onChange={handleKeywordChange}
      onKeyDown={executeIssueSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Box sx={{ minWidth: 100 }}>
              <DropdownSelect
                selectedOption={searchParams.filter}
                handleFilterChange={handleFilterChange}
                options={[
                  { value: "ISSUE", label: "이슈" },
                  { value: "TASK", label: "태스크" },
                  { value: "ASSIGNEE", label: "담당자" },
                ]}
              />
            </Box>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              type="button"
              aria-label="serach"
              disabled={!searchParams.keyword}
              onClick={executeIssueSearch}
              color="primary"
            >
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
