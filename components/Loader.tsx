import { StyleVariables } from "@/utils/constants/Colors";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Loader() {
  return (
    <View style={styles.loader_bg}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
}

const styles = StyleSheet.create({
  loader_bg: {
    position: "absolute",
    backgroundColor: StyleVariables.color.white_default,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
});
