import { styled } from "@mui/material/styles";
import { autocompleteClasses, Popper, InputBase } from "@mui/material";

export const StyledAutocompletePopper = styled("div")(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    backgroundColor: theme.palette.primary.main,
    padding: "0 6px 0 0",
  },
  [`& .${autocompleteClasses.paper} *`]: {
    margin: 0,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    color: "white",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "6px",
      height: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.background.paper,
      borderRadius: "50px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#C2C6D6",
    },
    [`& .${autocompleteClasses.option}`]: {
      fontSize: 14,
      display: "flex",
      gap: "10px",
      padding: "10px 20px",
      '&[aria-selected="true"]': {
        backgroundColor: theme.palette.secondary.main,
      },
      [`&.${autocompleteClasses.focused}, &[aria-selected="true"].${autocompleteClasses.focused}`]:
        {
          backgroundColor: theme.palette.background.light,
        },
    },
  },
  [`& .${autocompleteClasses.noOptions}`]: {
    fontSize: 14,
    color: "white",
    paddingLeft: 20,
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: "relative",
  },
}));

export const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: "20px 20px 10px",
  width: "100%",
  "& input": {
    borderRadius: 4,
    backgroundColor: theme.palette.background.default,
    padding: 8,
    fontSize: 14,
  },
}));

export const StyledPopper = styled(Popper)(({ theme }) => ({
  width: "300px",
  boxShadow: theme.shadows[3],
  borderRadius: 6,
  fontSize: 13,
  color: theme.palette.background.default,
  backgroundColor: theme.palette.primary.main,
  zIndex: "10",
}));
