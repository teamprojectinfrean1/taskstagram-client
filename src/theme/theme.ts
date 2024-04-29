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
      default: "#FFFFFF",
    },
    text: {
      primary: "#626262",
      secondary: "#121923",
    },
    error: {
      main: "#ff1744",
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        arrow: {
          color: "#F7F5FF",
          "&::before": {
            border: "1px solid #6D53F3",
          },
        },
        tooltip: {
          fontSize: "14px",
          fontWeight: 600,
          padding: 5,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
        },
      },
    },
  },
});

export default theme;
