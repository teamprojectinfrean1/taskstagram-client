import ProjectObj from "@/models/ProjectObj";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Checkbox, TextField, Paper } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import React, { useState } from "react";
import theme from "@/theme/theme";

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
      isOptionEqualToValue={(option, value) => option === value}
      noOptionsText="일치하는 옵션이 없습니다"
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
            icon={
              <StarBorderIcon
                fontSize="small"
                sx={{ color: theme.palette.background.default }}
              />
            }
            checkedIcon={<StarIcon fontSize="small" sx={{ color: "yellow" }} />}
            style={{ marginRight: 8 }}
          />
          {option.projectName}
        </li>
      )}
      renderInput={(params) => <TextField {...params} />}
      PaperComponent={(props) => (
        <Paper
          {...props}
          sx={{
            "& .MuiAutocomplete-listbox": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.background.default,
              p: 0,
            },
          }}
        />
      )}
      sx={{
        width: 300,
        "& .MuiOutlinedInput-root": {
          p: 0,
          color: theme.palette.background.default,
          border: "1px solid white",
        },
        "& .MuiAutocomplete-popupIndicator": {
          color: theme.palette.background.default,
        },
      }}
    />
  );
};

export default ProjectAutoComplete;
