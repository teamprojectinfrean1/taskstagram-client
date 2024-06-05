import { useState } from "react";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Paper,
  Stack,
  Typography,
  TextField,
  TextFieldProps,
} from "@mui/material";

type BaseProps<T> = {
  possibleOptions: T[];
  optionIdentifier: keyof T;
  optionLabel: keyof T;
  error?: boolean;
  helperText?: string | null;
  InputProps?: (
    params: AutocompleteRenderInputParams
  ) => Partial<TextFieldProps["InputProps"]>;
  renderInput?: (params: TextFieldProps) => React.ReactNode;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: T
  ) => React.ReactNode;
  renderSkeleton?: (index: number) => React.ReactNode;
  optionsFetchErrorMessage?: React.ReactNode;
  optionIsLoading?: boolean;
  fetchOptions?: () => {};
};

type SingleSelectProps<T> = BaseProps<T> & {
  selectedOptions: T;
  onSelectionChange: (value: T | null) => void;
  multiselect: false;
};

type MultiSelectProps<T> = BaseProps<T> & {
  selectedOptions: T[];
  onSelectionChange: (value: T[]) => void;
  multiselect: true;
};

type SearchableSelectProps<T> = SingleSelectProps<T> | MultiSelectProps<T>;

const SearchableSelect = <T extends object>({
  possibleOptions,
  selectedOptions,
  onSelectionChange,
  optionIdentifier,
  optionLabel,
  multiselect,
  error,
  helperText,
  InputProps,
  renderInput,
  renderOption,
  renderSkeleton,
  optionsFetchErrorMessage,
  optionIsLoading,
  fetchOptions,
}: SearchableSelectProps<T>) => {
  const [fetchInitiated, setFetchInitiated] = useState(false);

  const handleFocus = () => {
    if (!fetchInitiated) {
      setFetchInitiated(true);
      if (fetchOptions) {
        fetchOptions();
      }
    }
  };

  const isOptionEqualToValue = (option: T, value: T) =>
    option[optionIdentifier] === value[optionIdentifier];

  const getOptionLabel = (option: T) => {
    if (!option || option[optionLabel] == null) return "";
    return option[optionLabel] as string;
  };

  const filterValidSelection = () => {
    if (multiselect) {
      return Array.isArray(selectedOptions)
        ? selectedOptions.filter((opt) => opt && opt[optionIdentifier] != null)
        : [];
    } else {
      return selectedOptions && selectedOptions[optionIdentifier] != null
        ? selectedOptions
        : null;
    }
  };

  const handleInputProps = (params: AutocompleteRenderInputParams) => {
    const defaultInputProps = params.InputProps;
    const customInputProps = InputProps ? InputProps(params) : {};
    return {
      ...defaultInputProps,
      ...customInputProps,
    };
  };

  const noOptionsText = () => {
    if (
      optionIsLoading ||
      (!fetchInitiated && possibleOptions.length <= 0 && fetchOptions)
    )
      return "";
    if (optionsFetchErrorMessage) return optionsFetchErrorMessage;
    return (
      <Typography
        sx={{
          fontSize: ".7rem",
          fontWeight: 600,
        }}
      >
        일치하는 옵션이 없습니다.
      </Typography>
    );
  };

  return (
    <Autocomplete
      value={filterValidSelection()}
      onChange={(_, value) => {
        if (multiselect) {
          onSelectionChange(value as T[]);
        } else {
          onSelectionChange(value as T | null);
        }
      }}
      options={optionsFetchErrorMessage ? [] : possibleOptions}
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      multiple={multiselect}
      noOptionsText={noOptionsText()}
      ListboxProps={{
        className: "custom-scrollbar",
      }}
      PaperComponent={({ children }) => (
        <Paper>
          {/* {children} */}
          {optionIsLoading && renderSkeleton ? (
            <Stack spacing={2} sx={{ p: 2 }}>
              {Array.from({ length: 4 }, (_, index) => renderSkeleton(index))}
            </Stack>
          ) : (
            children
          )}
        </Paper>
      )}
      renderInput={
        renderInput ||
        ((params) => (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              onFocus: handleFocus,
              ...(InputProps ? handleInputProps(params) : {}),
            }}
            inputProps={{
              ...params.inputProps,
            }}
            error={error}
            helperText={helperText}
          />
        ))
      }
      renderOption={
        renderOption ||
        ((props, option) => <li {...props}>{getOptionLabel(option)}</li>)
      }
    />
  );
};

export default SearchableSelect;
