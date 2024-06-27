import { createTheme, ThemeOptions } from "@mui/material/styles";
import {
  blueGrey,
  orange,
  yellow,
  red,
  green,
  grey,
} from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      globalTimeMarker: string; // Custom UI Element Color (Current Time Marker)
      localTimeMarker: string; // Custom UI Element Color
      measurementFontFamily: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    custom?: {
      globalTimeMarker?: string; // Custom UI Element Color (Current Time Marker)
      localTimeMarker?: string; // Custom UI Element Color
      measurementFontFamily: string;
    };
  }
}

export const themeOptions: ThemeOptions = {
  custom: {
    globalTimeMarker: red["500"],
    localTimeMarker: green["500"],
    measurementFontFamily: "Roboto mono",
  },
  palette: {
    mode: "dark",
    primary: orange,
    secondary: yellow,
    background: {
      default: blueGrey["900"], // Dark Blue-Gray (Maintained)
      paper: blueGrey["600"], // Transparent Overlay (Maintained)
    },
    text: {
      primary: grey["A100"], // White (Maintained)
      secondary: grey["A200"], // Light Gray (Maintained)
      disabled: grey["A400"], // Darker Gray (Enhanced Legibility)
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
        centerRipple: true,
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
};

export const theme = createTheme(themeOptions);
