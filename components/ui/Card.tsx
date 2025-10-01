import { StyleVariables } from "@/utils/constants/Colors";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const Card = ({
  onPress,
  cardTxt,
  extraStyle,
}: {
  onPress: () => void;
  cardTxt: string;
  extraStyle?: any;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, extraStyle]}>
      <Text style={styles.card_text}>{cardTxt}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  card: {
    backgroundColor: StyleVariables.color.white_default,
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
  },
  card_text: {
    fontWeight: "500",
    color: StyleVariables.color.grey_font,
  },
});
