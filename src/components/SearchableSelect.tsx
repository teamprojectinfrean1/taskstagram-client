import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  InputLabel,
  Paper,
  TextField,
  TextFieldProps,
} from "@mui/material";
import theme from "@/theme/theme";

type SingleSelectProps<T> = {
  label: string;
  possibleOptions: T[];
  selectedOptions: T;
  onSelectionChange: (value: T | null) => void;
  optionIdentifier: keyof T;
  optionLabel: keyof T;
  multiselect: false;
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
};

type MultiSelectProps<T> = {
  label: string;
  possibleOptions: T[];
  selectedOptions: T[];
  onSelectionChange: (value: T[]) => void;
  optionIdentifier: keyof T;
  optionLabel: keyof T;
  multiselect: true;
  error?: boolean;
  helperText?: string;
  InputProps?: (
    params: AutocompleteRenderInputParams
  ) => Partial<TextFieldProps["InputProps"]>;
  renderInput?: (params: TextFieldProps) => React.ReactNode;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: T
  ) => React.ReactNode;
};

type SearchableSelectProps<T> = SingleSelectProps<T> | MultiSelectProps<T>;

const SearchableSelect = <T extends object>({
  label,
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
}: SearchableSelectProps<T>) => {
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

  console.log(selectedOptions);

  return (
    <Box>
      <InputLabel htmlFor={`input-${label}`} sx={{ fontWeight: "bold", mb: 1 }}>
        {label}
      </InputLabel>
      <Autocomplete
        value={filterValidSelection()}
        onChange={(_, value) => {
          if (multiselect) {
            onSelectionChange(value as T[]);
          } else {
            onSelectionChange(value as T | null);
          }
        }}
        options={possibleOptions}
        isOptionEqualToValue={isOptionEqualToValue}
        getOptionLabel={getOptionLabel}
        multiple={multiselect}
        noOptionsText="일치하는 옵션이 없습니다"
        ListboxProps={{
          className: "custom-scrollbar",
        }}
        PaperComponent={({ children }) => (
          <Paper style={{ backgroundColor: theme.palette.background.default }}>
            {children}
          </Paper>
        )}
        renderInput={
          renderInput ||
          ((params) => (
            <TextField
              {...params}
              id={`input-${label}`}
              variant="outlined"
              fullWidth
              InputProps={handleInputProps(params)}
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
    </Box>
  );
};

export default SearchableSelect;
