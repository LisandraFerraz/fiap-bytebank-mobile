import { ThemedText } from "@/components/ThemedText";
import { StyleVariables } from "@/utils/constants/Colors";
import { useNavigationState } from "@react-navigation/native";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Divisor from "../Divisor";
import Transaction from "./Transaction";

export default function TransactionsList() {
  const currentRouteName = useNavigationState(
    (state) => state.routes[state.index].name
  );

  let data = [
    {
      tipo: "DEPOSITO",
      transId: 1,
      valor: 1000,
      data: "10/12",
      file: "",
    },
    {
      tipo: "EMPRESTIMO",
      transId: "",
      valor: 2000,
      data: "10/12",
      aberto: true,
      valorPago: 50,
      valorDevido: 1950,
      file: "",
    },
  ];

  const ExtratoLink = () => {
    return (
      <>
        {!currentRouteName.includes("extrato") && (
          <Link href={"/screens/extrato"} style={styles.text_link}>
            Ver tudo
          </Link>
        )}
      </>
    );
  };

  return (
    <View style={styles.content_container}>
      {data ? (
        <>
          <View style={styles.text_group}>
            <ThemedText type="defaultSemiBold">Extrato</ThemedText>
            <ExtratoLink />
          </View>
          {data.map((ts: any, index: any) => (
            <>
              <View style={styles.cards_container} key={index}>
                <Transaction transaction={ts} />
              </View>
              <Divisor color="sogrey_faded" />
            </>
          ))}
        </>
      ) : (
        <View style={styles.no_data}>
          <Text>Seu extrato está vazio.</Text>
          <Text>Faça alguma transfência para visualizar aqui.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content_container: {
    paddingHorizontal: 15,
  },
  text_group: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cards_container: {
    width: "100%",
  },
  text_link: {
    color: StyleVariables.color.dark_green_default,
    textDecorationLine: "underline",
    fontWeight: "600",
  },
  no_data: {},
});
