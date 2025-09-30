import { StyleVariables } from "@/utils/constants/Colors";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Card } from "./Card";

interface IShortcut {
  title: string;
  url: string;
}

export default function Shortcuts() {
  const shortcuts: IShortcut[] = [
    {
      title: "PIX",
      url: "/sendPix",
    },
    {
      title: "TED",
      url: "/sendTED",
    },
    {
      title: "Empréstimos",
      url: "/sendLoan",
    },
    {
      title: "Adicionar dinheiro",
      url: "/sendDeposit",
    },
  ];

  return (
    <View style={styles.container}>
      <ThemedText type="defaultSemiBold">Atalhos</ThemedText>
      <View style={styles.cardsContainer}>
        {shortcuts.map((sc: IShortcut, index: any) => (
          <Card
            cardTxt={sc.title}
            onPress={() => router.push(sc.url as any)}
            key={index}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
    paddingVertical: 20,
    gap: 10,
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  card: {
    backgroundColor: StyleVariables.color.white_default,
    elevation: 1,
    height: 45,
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
