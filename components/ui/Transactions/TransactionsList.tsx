import ModalTransactionDetails from "@/components/ModalTransacao/ModalDetails";
import { ThemedText } from "@/components/ThemedText";
import { StyleVariables } from "@/utils/constants/Colors";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Divisor from "../Divisor";
import Transaction from "./Transaction";

export default function TransactionsList({
  data,
  hideLink,
}: {
  data: any[] | undefined;
  hideLink?: boolean;
}) {
  const [isModalShown, setIsModalShown] = useState<boolean>(true);
  const [dataModal, setDataModal] = useState<any>();

  const ExtratoLink = () => {
    return (
      <>
        {!hideLink && (
          <Link href={"/screens/extrato"} style={styles.text_link}>
            Ver tudo
          </Link>
        )}
      </>
    );
  };

  const openModalEdit = (data: any) => {
    setDataModal(data);
    setIsModalShown(true);
  };

  return (
    <>
      <View style={styles.content_container}>
        {data?.length ? (
          <>
            <View style={styles.text_group}>
              <ThemedText type="defaultSemiBold">Extrato</ThemedText>
              <ExtratoLink />
            </View>
            {data?.map((ts: any, index: any) => (
              <React.Fragment key={index}>
                <View style={styles.cards_container}>
                  <Pressable onPress={() => openModalEdit(ts)}>
                    <Transaction transaction={ts} />
                  </Pressable>
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

      {isModalShown && (
        <ModalTransactionDetails
          data={dataModal}
          onClose={() => {
            setIsModalShown(false);
            setDataModal([]);
          }}
          shown={isModalShown}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  content_container: {
    // paddingHorizontal: 15,
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
