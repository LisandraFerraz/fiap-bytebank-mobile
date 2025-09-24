import Login from "@/app/(auth)/login";
import BalanceCard from "@/components/ui/BalanceCard";
import Shortcuts from "@/components/ui/Shortcuts";
import TransactionsList from "@/components/ui/Transactions/TransactionsList";
import { useAuth } from "@/contex/AuthContext";
import { StyleVariables } from "@/utils/constants/Colors";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Login />;

  return (
    <SafeAreaView edges={["left", "right"]} style={styles.container}>
      <BalanceCard />
      <Shortcuts />
      <TransactionsList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    backgroundColor: StyleVariables.color.white_default,
    flex: 1,
  },
});
