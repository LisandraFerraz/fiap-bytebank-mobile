import { ThemedText } from "@/components/ThemedText";
import { StyleVariables } from "@/utils/constants/Colors";
import { FormatTypeName } from "@/utils/functions/format-transaction";
import {
  Deposito,
  Loan,
  Pix,
  Ted,
  TransacationTypes,
} from "@/utils/interfaces/transaction";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "../IconSymbol";

interface ITransactions {
  transaction: Ted | Pix | Loan | Deposito;
}

const TransactionIcon = ({
  transactionType,
}: {
  transactionType: TransacationTypes;
}) => {
  return (
    <Icon
      name={transactionType === "DEPOSITO" ? "arrow.down" : "arrow.up"}
      color={StyleVariables.color.dark_green_default}
    />
  );
};

export default function Transaction({ transaction }: ITransactions) {
  if (!transaction) return <></>;

  return (
    <>
      <View style={styles.card}>
        <View style={styles.card_details}>
          <TransactionIcon transactionType={transaction.tipo!} />
          <View style={styles.card_text}>
            <ThemedText>{FormatTypeName(transaction.tipo || "")}</ThemedText>
            <ThemedText style={styles.transaction_amount}>
              R$ {transaction.valor}
            </ThemedText>
          </View>
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
    paddingVertical: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card_details: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  card_text: {
    gap: 8,
  },
  transaction_amount: {
    fontWeight: "500",
    fontSize: 16,
  },
  transaction_date: {
    color: StyleVariables.color.grey_font,
  },
});
