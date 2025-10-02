/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const StyleVariables = {
  color: {
    green_highlight: "#59c3c3",
    red_highlight: "#f45b69",
    grey_highlight: "#637081",
    sogrey_highlight: "#d9d9d9",

    red_faded: "#fad3cfff",
    green_faded: "#d3eef3",
    grey_faded: "#7c98b3",
    sogrey_faded: "#ebebeb",
    transparent_green: "#d3eef3",

    grey_font: "#2b2d42",
    soft_font: "#8d99ae",

    dark_green_default: "#004d61",
    dark_default: "#000000",
    white_default: "#fff",

    dark_transparency: "#0000002e",
    soft_transparency: "#f2f2f2ff",
  },
  font: {
    text_lg: "1.5rem",
    text_md: "1.25rem",
    text_base: "1rem",
    text_sm: "0.8rem",
  },
};
