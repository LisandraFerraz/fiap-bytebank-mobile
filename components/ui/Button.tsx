import { StyleVariables } from "@/utils/constants/Colors";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Button({
  name,
  diabled,
  onClick,
}: {
  name: string;
  diabled: boolean;
  onClick: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.button, diabled ? styles.on_disabled : styles.on_confirm]}
      disabled={diabled}
      onPress={() => onClick()}
    >
      <Text style={styles.button_text}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    elevation: 1,
    padding: 10,
    flex: 1,
    height: 45,
    justifyContent: "center",
  },
  button_text: {
    color: StyleVariables.color.white_default,
    textTransform: "uppercase",
    fontWeight: "500",
    fontSize: 14,
    letterSpacing: 1,
    textAlign: "center",
  },
  on_confirm: {
    backgroundColor: StyleVariables.color.dark_green_default,
  },
  on_disabled: {
    backgroundColor: StyleVariables.color.grey_faded,
  },
});
