import ProjectObj from "@/models/ProjectObj";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

type ProjectAutoCompleteProps = {
  projects: ProjectObj[];
};

const ProjectAutoComplete = ({ projects }: ProjectAutoCompleteProps) => {
  const handleStartCheckBoxChange = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
  };
  return (
    <Autocomplete
      id="checkboxes-tags-demo"
      disableCloseOnSelect
      disableClearable
      options={projects}
      getOptionLabel={(option) => option.projectName}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            disableRipple
            onClick={handleStartCheckBoxChange}
            icon={<StarBorderIcon fontSize="small" />}
            checkedIcon={<StarIcon fontSize="small" sx={{ color: "yellow" }} />}
            style={{ marginRight: 8 }}
          />
          {option.projectName}
        </li>
      )}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default ProjectAutoComplete;
