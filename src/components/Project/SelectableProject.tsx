import Project from "@/models/Project";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Checkbox,
  TextField,
  Paper,
  autocompleteClasses,
  Popper,
  ClickAwayListener,
  Box,
  Button,
  InputBase,
  InputLabel,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import DoneIcon from "@mui/icons-material/Done";
import React, { useState } from "react";
import theme from "@/theme/theme";
import { styled } from "@mui/material/styles";

type SelectableProjectProps = {
  projects: Project[];
  selectedProject: Project | null;
  onClickCheckBox(selectedProject: Project | null): void;
  onSelectedProjectChanged(value: Project | null): void;
};

type PopperComponentProps = {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
};

const StyledAutocompletePopper = styled("div")(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: "none",
    margin: 0,
    color: "inherit",
    fontSize: 14,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: theme.palette.primary.main,
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      minHeight: "auto",
      alignItems: "flex-start",
      padding: 8,
      borderBottom: "1px solid white",
      '&[aria-selected="true"]': {
        backgroundColor: "transparent",
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
        {
          backgroundColor: theme.palette.action.hover,
        },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: "relative",
  },
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: "100%",
  borderBottom: "1px solid white",
  "& input": {
    borderRadius: 4,
    backgroundColor: theme.palette.background.default,
    padding: 8,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    border: "1px solid white",
    fontSize: 14,
  },
}));

function PopperComponent(props: PopperComponentProps) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: "1px solid white",
  borderRadius: 6,
  fontSize: 13,
  color: "white",
  backgroundColor: theme.palette.primary.main,
}));

const SelectableProject = ({
  projects,
  selectedProject,
  onSelectedProjectChanged,
  onClickCheckBox,
}: SelectableProjectProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleCheckBoxClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    selectedProject: Project | null,
    selectedValue: boolean
  ) => {
    e.stopPropagation();
    onClickCheckBox(selectedProject);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    //setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    //setValue(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const handleCreateProjectBtnClick = () => {
    setIsOpen(false);
    handleClose();
    navigate("/project");
  };

  const handleOptionChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: Project | null
  ) => {
    onSelectedProjectChanged(value);
    setIsOpen(false);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "github-label" : undefined;

  //임시 테스트
  // if (projects.length === 0) {
  //   projects.push({
  //     projectId: projects.length.toString(),
  //     projectName:
  //       "hellohellohellohellohellohellohellohellohellohellohellohellohellohello",
  //     projectContent: "eee",
  //     projectStartDate: "ss",
  //     projectEndDate: "33",
  //     projectMemberUuidList: null,
  //     projectTags: null,
  //     isMainProject: true,
  //   });
  // }

  return (
    <>
      <Box
        sx={{
          width: 300,
          fontSize: 13,
          border: "1px solid white",
          display: "flex",
        }}
        onClick={handleClick}
        aria-describedby={id}
      >
        <InputLabel
          htmlFor={`input-${selectedProject?.projectName}`}
          sx={{
            color: theme.palette.background.default,
            width: "80%",
            fontWeight: "bold",
            mb: 0,
            mt: 1,
            ml: 1,
          }}
        >
          {selectedProject?.projectName}
        </InputLabel>
        <Button
          disableRipple
          sx={{
            fontSize: 13,
            width: "20%",
            textAlign: "right",
            color: theme.palette.background.default,
            fontWeight: 600,
          }}
        >
          <UnfoldMoreIcon />
        </Button>
      </Box>
      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Autocomplete
              open
              disableClearable
              disableCloseOnSelect
              options={projects}
              isOptionEqualToValue={(option, value) => option === value}
              noOptionsText={
                projects && projects.length > 0
                  ? "일치하는 옵션이 없습니다"
                  : "프로젝트가 없습니다"
              }
              PopperComponent={PopperComponent}
              onChange={handleOptionChange}
              onOpen={() => setIsOpen(true)}
              onClose={() => setIsOpen(false)}
              getOptionLabel={(option) => option.projectName}
              renderOption={(props, option, { selected }) => (
                <li {...props} key={option.projectId}>
                  <Box>
                    <Checkbox
                      disableRipple
                      onClick={(e) => {
                        handleCheckBoxClick(e, option, selected);
                      }}
                      checked={option.isMainProject}
                      icon={
                        <StarBorderIcon
                          fontSize="small"
                          sx={{ color: theme.palette.background.default }}
                        />
                      }
                      checkedIcon={
                        <StarIcon fontSize="small" sx={{ color: "yellow" }} />
                      }
                      sx={{ width: 17, height: 17, mr: "5px", ml: "-2px" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      flexGrow: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {option.projectName}
                  </Box>
                  <Box
                    component={DoneIcon}
                    sx={{ opacity: 0.6, width: 18, height: 18 }}
                    style={{
                      visibility:
                        selectedProject?.projectId === option.projectId
                          ? "visible"
                          : "hidden",
                    }}
                  />
                </li>
              )}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  placeholder="프로젝트명 입력"
                />
              )}
              PaperComponent={(props) => (
                <Paper
                  {...props}
                  sx={{
                    "& .MuiAutocomplete-listbox": {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.background.default,
                      p: 0,
                    },
                    "& .MuiAutocomplete-noOptions": {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.background.default,
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
            <Box
              sx={{
                borderBottom: "1px solid white",
                borderTop: "1px solid gray",
                padding: "10px 10px",
                fontWeight: 600,
                "&:hover": { cursor: "pointer" },
              }}
              onClick={handleCreateProjectBtnClick}
            >
              새 프로젝트 추가
            </Box>
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </>
  );
};

export default SelectableProject;
