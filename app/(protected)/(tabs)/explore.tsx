import TransactionsList from "@/components/ui/Transactions/TransactionsList";
import { StyleVariables } from "@/utils/constants/Colors";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TransactionsList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleVariables.color.white_default,
  },
});
