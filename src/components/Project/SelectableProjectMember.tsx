import { useEffect, useState } from "react";
import theme from "@/theme/theme";
import {
  Autocomplete,
  Paper,
  ClickAwayListener,
  Box,
  Stack,
  IconButton,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import SettingsIcon from "@mui/icons-material/Settings";
import UserAvatar from "@/components/UserAvatar";
import {
  StyledAutocompletePopper,
  StyledInput,
  StyledPopper,
} from "@/components/Project";

type ProjectMemberAutocompleteProps = {
  isMemberProjectLeader: boolean;
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
  isMemberProjectLeader,
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
      {isMemberProjectLeader && (
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
      )}
      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Stack>
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
                      imageUrl={option.profileImage ?? ""}
                      size={25}
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
                      maxHeight: "30vh",
                    },
                  }}
                />
              )}
            />
          </Stack>
        </ClickAwayListener>
      </StyledPopper>
    </>
  );
};

export default ProjectMemberAutocomplete;
