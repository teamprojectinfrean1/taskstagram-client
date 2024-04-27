import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const PrimaryButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.background.default,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
  "&.Mui-disabled": {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.grey[600],
    "&:hover": {
      backgroundColor: theme.palette.grey[400],
    },
  },
}));

export default PrimaryButton;
