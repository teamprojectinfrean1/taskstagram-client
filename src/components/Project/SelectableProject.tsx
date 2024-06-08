import { ProjectSummary } from "@/models/Project";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Checkbox,
  Paper,
  ClickAwayListener,
  Box,
  Button,
  IconButton,
  InputLabel,
  Stack,
  Typography,
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
import { yellow } from "@mui/material/colors";

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
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
          px: 1,
          borderBottom: "1px solid white",
          "&:hover *": {
            cursor: "pointer",
          },
        }}
        onClick={handleClick}
        aria-describedby={id}
      >
        <InputLabel
          htmlFor={`input-${selectedProject?.projectName}`}
          sx={{
            color: "white",
            width: "80%",
            fontWeight: "bold",
          }}
        >
          {projectList?.length > 0
            ? selectedProject?.projectName
            : "프로젝트가 없습니다"}
        </InputLabel>
        <IconButton edge="end" color="inherit">
          <UnfoldMoreIcon />
        </IconButton>
      </Box>
      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Stack>
            {projectList?.length > 0 && (
              <Autocomplete
                open
                disableClearable
                disableCloseOnSelect
                options={projectList}
                value={selectedProject!}
                isOptionEqualToValue={(option, value) => option === value}
                noOptionsText="일치하는 옵션이 없습니다"
                PopperComponent={PopperComponent}
                onChange={handleOptionChange}
                getOptionLabel={(option) => option.projectName}
                renderOption={(props, option, { selected }) => (
                  <li {...props} key={option.projectId}>
                    <Checkbox
                      disableRipple
                      onClick={(e) => {
                        handleCheckBoxClick(e, option);
                      }}
                      checked={option.isMainProject}
                      icon={
                        <StarBorderIcon
                          fontSize="medium"
                          sx={{
                            color: "white",
                          }}
                        />
                      }
                      checkedIcon={
                        <StarIcon
                          fontSize="medium"
                          sx={{
                            color: yellow[600],
                          }}
                        />
                      }
                      sx={{
                        width: 17,
                        height: 17,
                        "&:hover .MuiSvgIcon-root": {
                          color: yellow[600],
                        },
                      }}
                    />
                    <Box
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {option.projectName}
                    </Box>
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
              />
            )}
            <Box
              sx={{
                py: 2,
                px: 2,
                fontWeight: 600,
                cursor: "pointer",
                borderTop: "1px solid white",
                "&:hover": {
                  color: theme.palette.background.paper,
                },
              }}
              onClick={handleCreateProjectBtnClick}
            >
              새 프로젝트 추가
            </Box>
          </Stack>
        </ClickAwayListener>
      </StyledPopper>
    </>
  );
};

export default SelectableProject;
