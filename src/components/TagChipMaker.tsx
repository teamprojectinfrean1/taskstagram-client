import { Chip, Autocomplete, TextField } from "@mui/material";

type TagProps = {
  tagList: string[] | null;
  onTagSelectionChange: (tags: string[] | null) => void;
};

const TagChipMaker = ({ tagList, onTagSelectionChange }: TagProps) => {
  const handleTagsChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string[] | null
  ) => {
    onTagSelectionChange(value);
  };
  return (
    <Autocomplete
      multiple
      freeSolo
      disableClearable
      value={tagList ?? []}
      onChange={handleTagsChange}
      options={[]}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            label={"#" + option}
            {...getTagProps({ index })}
            sx={{
              height: "25px",
              "& .MuiChip-deleteIcon": { fontSize: "17px" },
            }}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="태그입력"
          InputProps={{
            ...params.InputProps,
            sx: {
              fontSize: "0.9rem",
            },
          }}
        />
      )}
      sx={{
        "& .MuiOutlinedInput-root": {
          p: "4px 9px 4px 9px",
        },
      }}
    />
  );
};

export default TagChipMaker;
