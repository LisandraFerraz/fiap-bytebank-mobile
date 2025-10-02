import { StyleVariables } from "@/utils/constants/Colors";
import { Pressable, StyleSheet, Text } from "react-native";

export const AttachBtn = ({ onPress }: { onPress: any }) => {
  return (
    <Pressable style={styles.attach_btn} onPress={onPress}>
      <Text>Anexar imagem</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  attach_btn: {
    backgroundColor: StyleVariables.color.soft_transparency,
    height: 45,
    width: "100%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dotted",
    borderWidth: 2,
    borderColor: StyleVariables.color.dark_transparency,
  },
});
