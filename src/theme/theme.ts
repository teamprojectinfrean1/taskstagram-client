import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#445c6f",
      dark: "#121923",
      contrastText: "rgba(255,255,255,0.87)",
      light: "#bfbfc9",
    },
    secondary: {
      main: "#5f7373",
      dark: "#293737",
      light: "#bbc7c7",
    },
    text: {
      primary: "#000000",
      secondary: "#20315C",
    },
    background: {
      default: "#E5E8ED",
    },
  },
});

export default theme;
