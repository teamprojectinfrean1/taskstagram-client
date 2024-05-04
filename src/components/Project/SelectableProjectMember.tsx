import { useEffect, useState } from "react";
import theme from "@/theme/theme";
import {
  Autocomplete,
  Paper,
  ClickAwayListener,
  Box,
  IconButton,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import SettingsIcon from "@mui/icons-material/Settings";
import UserAvatar from "../UserAvatar";
import {
  StyledAutocompletePopper,
  StyledInput,
  StyledPopper,
} from "@/components/Project/ProjectStyled";

type ProjectMemberAutocompleteProps = {
  memberUuidList: UserSummary[];
  selectedMemberUuidList: string[] | null;
  onSelectedMemberChanged(value: string[] | null): void;
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

const ProjectMemberAutocomplete = ({
  memberUuidList,
  selectedMemberUuidList,
  onSelectedMemberChanged,
}: ProjectMemberAutocompleteProps) => {
  const [value, setValue] = useState<UserSummary[]>([]);
  const [pendingValue, setPendingValue] = useState<UserSummary[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? "projectUserLabel" : undefined;

  useEffect(() => {
    if (memberUuidList && selectedMemberUuidList) {
      const memeberValue: UserSummary[] = memberUuidList.filter((x) =>
        selectedMemberUuidList.includes(x.id)
      );
      setValue(memeberValue);
    }
  }, [memberUuidList, selectedMemberUuidList]);

  const handleOptionChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: UserSummary[] | null
  ) => {
    if (value !== null) {
      setPendingValue(value);
      onSelectedMemberChanged(value.map((x) => x.memberId));
    } else {
      onSelectedMemberChanged([]);
    }
  };

  const handleClose = () => {
    setValue(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Box sx={{ mb: 1, p: 0, display: "flex", justifyContent: "right" }}>
        <IconButton
          disableRipple
          size="small"
          onClick={handleClick}
          aria-describedby={id}
        >
          <SettingsIcon sx={{ color: theme.palette.primary.main }} />
        </IconButton>
      </Box>
      {value.length > 0 && (
        <Box sx={{ p: 1, border: "1px solid lightGray", borderRadius: "4px" }}>
          {value.map((label) => (
            <Box
              key={label.id}
              sx={{
                height: 20,
                mb: "3px",
                display: "flex",
                padding: ".15em 4px",
                lineHeight: "15px",
              }}
            >
              <Box>
                <UserAvatar
                  sx={{ width: 18, height: 18, mr: "6px" }}
                  src={label.profileImage ?? ""}
                />
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {label.nickname}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Autocomplete
              disableClearable
              multiple
              options={memberUuidList}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              noOptionsText="일치하는 사용자가 없습니다"
              open
              value={pendingValue}
              onChange={handleOptionChange}
              PopperComponent={PopperComponent}
              getOptionLabel={(option) => option.nickname}
              renderOption={(props, option, { selected }) => (
                <li {...props} key={option.id}>
                  <Box>
                    <UserAvatar
                      sx={{ width: 17, height: 17, mr: "6px", mt: "2px" }}
                      src={option.profileImage ?? ""}
                    />
                  </Box>
                  <Box
                    sx={{
                      flexGrow: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {option.nickname}
                  </Box>
                  <Box
                    component={DoneIcon}
                    sx={{ opacity: 0.6, width: 18, height: 18 }}
                    style={{
                      visibility: selected ? "visible" : "hidden",
                    }}
                  />
                </li>
              )}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  placeholder="닉네임 입력"
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
                      maxHeight: "30vh",
                    },
                    "& .MuiAutocomplete-noOptions": {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.background.default,
                    },
                  }}
                />
              )}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  p: "0px 0px 0px 9px",
                  color: theme.palette.background.default,
                  border: "1px solid white",
                },
                "& .MuiAutocomplete-popupIndicator": {
                  color: theme.palette.background.default,
                },
              }}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </>
  );
};

export default ProjectMemberAutocomplete;
