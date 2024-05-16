import { ProjectSummary } from "@/models/Project";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Checkbox,
  Paper,
  ClickAwayListener,
  Box,
  Button,
  InputLabel,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import DoneIcon from "@mui/icons-material/Done";
import React, { useState, useEffect } from "react";
import theme from "@/theme/theme";
import { useRecoilValue } from "recoil";
import { selectedProjectState } from "@/stores/projectStore";
import {
  StyledAutocompletePopper,
  StyledInput,
  StyledPopper,
} from "@/components/Project";

type SelectableProjectProps = {
  projects: ProjectSummary[];
  onClickCheckBox(selectedProjectId: string | null): void;
  onSelectedProjectChanged(value: ProjectSummary | null): void;
};

type PopperComponentProps = {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
};

const PopperComponent = (props: PopperComponentProps) => {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
};

const SelectableProject = ({
  projects,
  onSelectedProjectChanged,
  onClickCheckBox,
}: SelectableProjectProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const selectedProject = useRecoilValue(selectedProjectState);
  const [projectList, setProjectList] = useState<ProjectSummary[]>([]);

  useEffect(() => {
    if (projects && projects.length > 0) {
      setProjectList(projects);
    }
  }, [projects]);

  const handleCheckBoxClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    selectedProject: ProjectSummary | null
  ) => {
    e.stopPropagation();
    //메인 프로젝트가 아닌 프로젝트만 변경되도록
    if (
      selectedProject !== null &&
      selectedProject.projectId !== null &&
      selectedProject.isMainProject === false
    ) {
      onClickCheckBox(selectedProject.projectId);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const handleCreateProjectBtnClick = () => {
    onSelectedProjectChanged(null);
    handleClose();
    navigate("/project", { state: { type: "new" } });
  };

  const handleOptionChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: ProjectSummary | null
  ) => {
    onSelectedProjectChanged(value);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "projectLabel" : undefined;

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
          {selectedProject?.projectName ?? "새 프로젝트 추가"}
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
              options={projectList}
              isOptionEqualToValue={(option, value) => option === value}
              noOptionsText={
                projectList && projectList.length > 0
                  ? "일치하는 옵션이 없습니다"
                  : "프로젝트가 없습니다"
              }
              PopperComponent={PopperComponent}
              onChange={handleOptionChange}
              getOptionLabel={(option) => option.projectName}
              renderOption={(props, option, { selected }) => (
                <li {...props} key={option.projectId}>
                  <Box>
                    <Checkbox
                      disableRipple
                      onClick={(e) => {
                        handleCheckBoxClick(e, option);
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
