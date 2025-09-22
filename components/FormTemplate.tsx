import { StyleVariables } from "@/utils/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

export default function FormTemplate({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <View style={styles.container}>
      <ThemedText type="title">{title}</ThemedText>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 25,
    padding: 15,
    backgroundColor: StyleVariables.color.white_default,
  },
});
