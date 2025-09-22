import { ThemedText } from "@/components/ThemedText";
import { StyleVariables } from "@/utils/constants/Colors";
import {
  IDeposito,
  IEmprestimo,
  IPix,
  ITed,
} from "@/utils/interfaces/transaction";
import { StyleSheet, Text, View } from "react-native";

interface ITransactions {
  transaction: ITed | IPix | IEmprestimo | IDeposito;
}

export default function Transaction({ transaction }: ITransactions) {
  return (
    <>
      <View style={styles.card}>
        <Text style={styles.transaction_amount}>{transaction.data}</Text>
        <ThemedText>{transaction.tipo}</ThemedText>
        <ThemedText>R$ {transaction.valor}</ThemedText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: StyleVariables.color.white_default,
    paddingVertical: 10,
    gap: 10,
  },
  transaction_amount: {
    fontWeight: "500",
    fontSize: 16,
  },
});
