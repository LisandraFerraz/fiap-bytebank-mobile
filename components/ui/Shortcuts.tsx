import { StyleVariables } from "@/utils/constants/Colors";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IShortcut {
  title: string;
  url: string;
}

export default function Shortcuts() {
  const shortcuts: IShortcut[] = [
    {
      title: "PIX",
      url: "/screens/pix/sendPix",
    },
    {
      title: "TED",
      url: "/screens/sendTED",
    },
    {
      title: "Empréstimos",
      url: "/screens/Loan",
    },
    {
      title: "Adicionar dinheiro",
      url: "/screens/addMoney",
    },
  ];

  return (
    <View style={styles.container}>
      {shortcuts.map((sc: IShortcut, index: any) => (
        <TouchableOpacity
          onPress={() => router.push(sc.url as any)}
          key={index}
          style={styles.card}
        >
          <Text style={styles.card_text} key={index}>
            {sc.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    overflow: "scroll",
    gap: 10,
    paddingHorizontal: 10,
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
