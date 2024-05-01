import { styled } from "@mui/material/styles";
import { autocompleteClasses, Popper, InputBase } from "@mui/material";

export const StyledAutocompletePopper = styled("div")(({ theme }) => ({
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

export const StyledInput = styled(InputBase)(({ theme }) => ({
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

export const StyledPopper = styled(Popper)(({ theme }) => ({
  border: "1px solid white",
  borderRadius: 6,
  fontSize: 13,
  color: theme.palette.background.default,
  backgroundColor: theme.palette.primary.main,
  zIndex: "10",
}));
