import { StyleVariables } from "@/utils/constants/Colors";
import { useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Divisor from "./Divisor";

export default function BalanceCard() {
  const userName = "Joana";

  const [valueHidden, setValueHidden] = useState<boolean>(false);

  return (
    <SafeAreaView edges={["left", "right"]} style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/fundo-home-top.png")}
        style={styles.balanceCard}
        imageStyle={{
          resizeMode: "cover",
        }}
      >
        <View style={styles.textCard}>
          <Text style={styles.titleCard}>Olá, {userName}! :)</Text>
          <Divisor color="dark_green_default" />
          <Text
            style={{
              fontWeight: "600",
            }}
          >
            Saldo
          </Text>
          <View>
            <Text style={styles.cardBoldText}>
              {valueHidden ? "*****" : "R$ 1300"}
            </Text>
            {/* <Button title="x" onPress={() => setValueHidden(!valueHidden)} /> */}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    padding: 10,
  },
  balanceCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  titleCard: {
    fontSize: 22,
    fontWeight: "600",
    color: StyleVariables.color.dark_green_default,
    marginBottom: 15,
  },
  textCard: {
    width: "100%",
    position: "absolute",
    padding: 15,
    top: 0,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  cardBoldText: {
    color: StyleVariables.color.dark_green_default,
    fontWeight: "600",
    fontSize: 24,
  },
});
