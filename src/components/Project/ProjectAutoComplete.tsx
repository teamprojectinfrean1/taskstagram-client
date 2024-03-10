import ProjectObj from "@/models/ProjectObj";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Checkbox, TextField, Paper } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import React, { useState } from "react";

type ProjectAutoCompleteProps = {
  projects: ProjectObj[];
  selectedProject: ProjectObj | null;
  onClickCheckBox(selectedProject: ProjectObj | null): void;
  onSelectedProjectChanged(value: ProjectObj | null): void;
};

const ProjectAutoComplete = ({
  projects,
  selectedProject,
  onSelectedProjectChanged,
  onClickCheckBox,
}: ProjectAutoCompleteProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckBoxClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    selectedProject: ProjectObj | null,
    selectedValue: boolean
  ) => {
    e.stopPropagation();
    onClickCheckBox(selectedProject);
  };

  const handleCreateProjectBtnClick = () => {
    setIsOpen(false);
    navigate("/project");
  };

  const handleOptionChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: ProjectObj | null
  ) => {
    onSelectedProjectChanged(value);
  };

  return (
    <Autocomplete
      disableClearable
      options={projects}
      open={isOpen}
      onChange={handleOptionChange}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      getOptionLabel={(option) => option.projectName}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            disableRipple
            onClick={(e) => {
              handleCheckBoxClick(e, option, selected);
            }}
            icon={<StarBorderIcon fontSize="small" sx={{ color: "white" }} />}
            checkedIcon={<StarIcon fontSize="small" sx={{ color: "yellow" }} />}
            style={{ marginRight: 8 }}
          />
          {option.projectName}
        </li>
      )}
      PaperComponent={(props) => (
        <Paper
          {...props}
          sx={{
            "& .MuiAutocomplete-listbox": {
              backgroundColor: "#121923",
              color: "white",
            },
          }}
        />
      )}
      sx={{
        width: 300,
        "& .MuiOutlinedInput-root": {
          p: 0,
          color: "white",
          border: "1px solid white",
        },
        "& .MuiAutocomplete-popupIndicator": {
          color: "white",
        },
      }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default ProjectAutoComplete;
