import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary?: PaletteColor;
    default?: PaletteColor;
    text: {
      tertiary?: string;
    };
  }
  interface TypeBackground {
    light?: string;
  }
}
