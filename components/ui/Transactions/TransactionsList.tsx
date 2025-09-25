import EditTransacionModal from "@/app/screens/pix/updatePix";
import { ThemedText } from "@/components/ThemedText";
import { StyleVariables } from "@/utils/constants/Colors";
import { UseTransactions } from "@/utils/hooks/useTransactions";
import { useNavigationState } from "@react-navigation/native";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Divisor from "../Divisor";
import Transaction from "./Transaction";

export default function TransactionsList() {
  const { listAllTransactions } = UseTransactions();

  const currentRouteName = useNavigationState(
    (state) => state.routes[state.index].name
  );

  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<any[] | undefined>([]);

  useEffect(() => {
    listAllTransactions().then((res) => {
      setTransactions(res);
    });
  }, []);

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
    <>
      <View style={styles.content_container}>
        {transactions ? (
          <>
            <View style={styles.text_group}>
              <ThemedText type="defaultSemiBold">Extrato</ThemedText>
              <ExtratoLink />
            </View>
            {transactions?.map((ts: any, index: any) => (
              <React.Fragment key={index}>
                <View style={styles.cards_container}>
                  <Transaction transaction={ts} />
                </View>
                <Divisor color="sogrey_faded" />
              </React.Fragment>
            ))}
          </>
        ) : (
          <View style={styles.no_data}>
            <Text>Seu extrato está vazio.</Text>
            <Text>Faça alguma transfência para visualizar aqui.</Text>
          </View>
        )}
      </View>
      <EditTransacionModal data={{}} shown={isModalShown} />
    </>
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
