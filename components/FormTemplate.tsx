import { StyleVariables } from "@/utils/constants/Colors";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

export default function FormTemplate({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <ScrollView style={styles.scroll_container}>
      <View style={styles.container}>
        <ThemedText type="title">{title}</ThemedText>
        {children}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll_container: {
    flex: 1,
    backgroundColor: StyleVariables.color.white_default,
  },
  container: {
    padding: 15,
    gap: 25,
  },
});
