import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#121923",
    },
    secondary: {
      main: "#173665",
      dark: "rgb(69, 94, 131)",
    },
    background: {
      paper: "rgba(228, 230, 237)",
    },
    text: {
      secondary: "#121923",
    },
  },
});

export default theme;
