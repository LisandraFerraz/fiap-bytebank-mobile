import TransactionsList from "@/components/ui/Transactions/TransactionsList";
import { StyleSheet, View } from "react-native";

export default function Extrato() {
  return (
    <View style={styles.container}>
      <TransactionsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
