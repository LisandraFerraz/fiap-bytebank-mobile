import { StyleSheet, Text, type TextProps } from "react-native";

import { StyleVariables } from "@/utils/constants/Colors";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "label"
    | "labelError"
    | "small";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  children,
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "label" ? styles.label : undefined,
        type === "labelError" ? styles.labelError : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: StyleVariables.color.dark_green_default,
    textDecorationLine: "underline",
    fontWeight: "600",
  },
  label: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "600",
    textTransform: "uppercase",
    color: StyleVariables.color.grey_font,
  },
  labelError: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    textTransform: "uppercase",
    color: StyleVariables.color.red_highlight,
  },
  small: {
    fontSize: 12,
    lineHeight: 24,
    fontWeight: "600",
    textTransform: "uppercase",
    color: StyleVariables.color.red_highlight,
  },
});
