import { ThemedText } from "@/components/ThemedText";
import { StyleVariables } from "@/utils/constants/Colors";
import { FormatTypeName } from "@/utils/functions/format-transaction";
import { Deposito, Loan, Pix, Ted } from "@/utils/interfaces/transaction";
import { StyleSheet, Text, View } from "react-native";

interface ITransactions {
  transaction: Ted | Pix | Loan | Deposito;
}

export default function Transaction({ transaction }: ITransactions) {
  return (
    <>
      <View style={styles.card}>
        <View style={styles.card_details}>
          <ThemedText>{FormatTypeName(transaction.tipo || "")}</ThemedText>
          <ThemedText style={styles.transaction_amount}>
            R$ {transaction.valor}
          </ThemedText>
        </View>
        <Text style={styles.transaction_date}>
          {transaction.data?.replace("-", "/").slice(0, 5)}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: StyleVariables.color.white_default,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card_details: {
    gap: 10,
  },
  transaction_amount: {
    fontWeight: "500",
    fontSize: 16,
  },
  transaction_date: {
    color: StyleVariables.color.grey_font,
  },
});
