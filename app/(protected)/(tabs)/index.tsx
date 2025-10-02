import SignUp from "@/app/(auth)/signup";
import BalanceCard from "@/components/ui/BalanceCard";
import { ExpensesChart } from "@/components/ui/ExpensesChart";
import Shortcuts from "@/components/ui/Shortcuts";
import TransactionsList from "@/components/ui/Transactions/TransactionsList";
import { useAuth } from "@/contex/AuthContext";
import { StyleVariables } from "@/utils/constants/Colors";
import { useLoader } from "@/utils/hooks/useLoader";
import { UseTransactions } from "@/utils/hooks/useTransactions";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { listAllTransactions } = UseTransactions();
  const { showLoader, hideLoader } = useLoader();
  const { isAuthenticated, logout } = useAuth();

  const [transactions, setTransactions] = useState<any[] | undefined>([]);

  useEffect(() => {
    showLoader();
    listAllTransactions({ itemsPage: 3, currentPage: 1 }).then((res) => {
      setTransactions(res.data.transactions);
      hideLoader();
    });
  }, []);

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
            <View>
              <Pressable style={styles.logout_btn} onPress={logout}>
                <Text style={styles.logout_btn_text}>Finalizar sessão</Text>
              </Pressable>
            </View>
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
    paddingVertical: 15,
    // position: "relative",
  },
  logout_btn: {
    backgroundColor: StyleVariables.color.red_faded,
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  logout_btn_text: {
    color: StyleVariables.color.red_highlight,
    fontWeight: 600,
  },
});
