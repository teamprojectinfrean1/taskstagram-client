import ProjectObj from "@/models/ProjectObj";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";

type ProjectAutoCompleteProps = {
  projects: ProjectObj[];
  onClickCheckBox(selectedProject: ProjectObj | null): void;
};

const ProjectAutoComplete = ({
  projects,
  onClickCheckBox,
}: ProjectAutoCompleteProps) => {
  const handleCheckBoxClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    selectedProject: ProjectObj | null,
    selectedValue: boolean
  ) => {
    e.stopPropagation();
    onClickCheckBox(selectedProject);
  };

  return (
    <Autocomplete
      id="checkboxes-tags-demo"
      disableClearable
      options={projects}
      getOptionLabel={(option) => option.projectName}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            disableRipple
            onClick={(e) => {
              handleCheckBoxClick(e, option, selected);
            }}
            checked={option.isMainProject}
            icon={<StarBorderIcon fontSize="small" />}
            checkedIcon={<StarIcon fontSize="small" sx={{ color: "yellow" }} />}
            style={{ marginRight: 8 }}
          />
          {option.projectName}
        </li>
      )}
      sx={{
        width: 300,
        "& .MuiOutlinedInput-root": {
          p: 0,
          color: "#eee",
          border: "1px solid #eee",
        },
        "& .MuiAutocomplete-popupIndicator": {
          color: "#eee",
        },
      }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default ProjectAutoComplete;
