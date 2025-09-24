import SignUp from "@/app/(auth)/signup";
import BalanceCard from "@/components/ui/BalanceCard";
import Shortcuts from "@/components/ui/Shortcuts";
import TransactionsList from "@/components/ui/Transactions/TransactionsList";
import { useAuth } from "@/contex/AuthContext";
import { StyleVariables } from "@/utils/constants/Colors";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <SignUp />;

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["left", "right"]} style={styles.container}>
        <ScrollView>
          <BalanceCard />
          <Shortcuts />
          <TransactionsList />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
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
