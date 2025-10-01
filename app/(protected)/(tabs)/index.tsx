import SignUp from "@/app/(auth)/signup";
import BalanceCard from "@/components/ui/BalanceCard";
import { ExpensesChart } from "@/components/ui/ExpensesChart";
import Shortcuts from "@/components/ui/Shortcuts";
import TransactionsList from "@/components/ui/Transactions/TransactionsList";
import { useAuth } from "@/contex/AuthContext";
import { StyleVariables } from "@/utils/constants/Colors";
import { UseTransactions } from "@/utils/hooks/useTransactions";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { listAllTransactions } = UseTransactions();
  const { isAuthenticated } = useAuth();

  const [transactions, setTransactions] = useState<any[] | undefined>([]);

  useEffect(() => {
    listTransactions();
  }, []);

  const listTransactions = () => {
    listAllTransactions({ itemsPage: 3, currentPage: 1 }).then((res) => {
      setTransactions(res.data.transactions);
    });
  };

  if (!isAuthenticated) return <SignUp />;

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView edges={["left", "right"]} style={styles.areaView}>
          <ScrollView>
            <BalanceCard />
            <Shortcuts />
            <TransactionsList data={transactions} />
            <ExpensesChart />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  areaView: {
    backgroundColor: StyleVariables.color.white_default,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
});
