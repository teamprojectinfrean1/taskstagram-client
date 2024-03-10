import { Ref, forwardRef } from "react";
import {
  Autocomplete,
  Checkbox,
  TextField,
  List,
  ListItemButton,
  ListItem,
  Button,
  ListProps,
} from "@mui/material";
import ProjectObj from "@/models/ProjectObj";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

type CustomListboxProps = ListProps & {
  onCreateBtnClick: () => void;
  handleCheckBoxClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    selectedProject: ProjectObj | null,
    selectedValue: boolean
  ) => void;
  projects: ProjectObj[];
};

const CustomListbox = forwardRef<HTMLUListElement, CustomListboxProps>(
  (
    { projects, onCreateBtnClick, handleCheckBoxClick }: CustomListboxProps,
    ref: Ref<HTMLUListElement>
  ) => {
    return (
      <List ref={ref} sx={{ p: 0, backgroundColor: "#121923", color: "#eee" }}>
        {projects.map((option) => (
          <ListItem key={option.projectId}>
            <Checkbox
              disableRipple
              onClick={(e) => {
                handleCheckBoxClick(e, option, option.isMainProject);
              }}
              checked={option.isMainProject}
              icon={<StarBorderIcon fontSize="small" />}
              checkedIcon={
                <StarIcon fontSize="small" sx={{ color: "yellow" }} />
              }
              style={{ marginRight: 8 }}
            />
            {option.projectName}
          </ListItem>
        ))}
        <ListItem>
          <ListItemButton onClick={onCreateBtnClick}>
            프로젝트 추가
          </ListItemButton>
        </ListItem>
      </List>
    );
  }
);

CustomListbox.displayName = "CustomListbox";

export default CustomListbox;
