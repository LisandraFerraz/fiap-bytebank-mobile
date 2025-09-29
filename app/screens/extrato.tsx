import { Card } from "@/components/ui/Card";
import TransactionsList from "@/components/ui/Transactions/TransactionsList";
import { StyleVariables } from "@/utils/constants/Colors";
import { UseTransactions } from "@/utils/hooks/useTransactions";
import { TransacationTypes } from "@/utils/interfaces/transaction";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

interface IFilters {
  title: string;
  type: keyof typeof TransacationTypes;
}

export default function Extrato() {
  const { listAllTransactions } = UseTransactions();

  const [transactions, setTransactions] = useState<any[] | undefined>([]);
  const [activeFilters, setActiveFilters] = useState<any[]>([]);
  const [filteredTrans, setFilteredTrans] = useState<any[]>([]);

  const filtersBtn: IFilters[] = [
    {
      title: "PIX",
      type: TransacationTypes.PIX,
    },
    {
      title: "TED",
      type: TransacationTypes.TED,
    },
    {
      title: "Empréstimos",
      type: TransacationTypes.EMPRESTIMO,
    },
    {
      title: "Depósitos",
      type: TransacationTypes.DEPOSITO,
    },
  ];

  useEffect(() => {
    listAllTransactions().then((res) => {
      setTransactions(res);
      setFilteredTrans(res);
    });
  }, []);

  const handleApplyTypeFilter = (
    ft: keyof typeof TransacationTypes | string
  ) => {
    if (!transactions) return;

    let newActiveFilters: string[];

    if (!isFilterActive(ft)) {
      newActiveFilters = [...activeFilters, ft];
    } else {
      newActiveFilters = activeFilters.filter((f) => f !== ft);
    }

    const parsedFilters =
      newActiveFilters.length > 0
        ? transactions.filter((ts) => newActiveFilters.includes(ts.tipo))
        : transactions;
    setActiveFilters(newActiveFilters);
    setFilteredTrans(parsedFilters);
  };

  const isFilterActive = (
    type: keyof typeof TransacationTypes | string
  ): boolean => {
    const targetFilter = activeFilters.includes(type);

    if (targetFilter) return true;
    return false;
  };

  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const handleApplyDataFilter = (ft: "antigo" | "recente") => {
    if (!transactions) return;

    let newActiveFilters: string[];

    if (!isFilterActive(ft)) {
      const keepOneDtF =
        ft === "recente"
          ? activeFilters.filter((f) => f !== "antigo")
          : activeFilters.filter((f) => f !== "recente");

      newActiveFilters = [...keepOneDtF, ft];
    } else {
      newActiveFilters = activeFilters.filter((f) => f !== ft);
    }

    const parsedFilters = [...transactions].sort((a, b) => {
      const dateA = parseDate(a.data).getTime();
      const dateB = parseDate(b.data).getTime();

      if (ft === "recente") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

    setActiveFilters(newActiveFilters);
    setFilteredTrans(parsedFilters);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {filtersBtn.map((ft: IFilters, index: any) => (
          <Card
            extraStyle={
              isFilterActive(ft.type) ? styles.activeFilter : styles.filter
            }
            cardTxt={ft.title}
            onPress={() => handleApplyTypeFilter(ft.type)}
            key={index}
          />
        ))}
      </View>
      <View>
        <View style={styles.cardsContainer}>
          <Card
            extraStyle={[
              isFilterActive("recente") ? styles.activeFilter : styles.filter,
              { borderRadius: 100 },
            ]}
            cardTxt="Mais recente"
            onPress={() => handleApplyDataFilter("recente")}
          />
          <Card
            extraStyle={[
              isFilterActive("antigo") ? styles.activeFilter : styles.filter,
              { borderRadius: 100 },
            ]}
            cardTxt="Mais antigo"
            onPress={() => handleApplyDataFilter("antigo")}
          />
        </View>
      </View>
      <TransactionsList hideLink={true} data={filteredTrans} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleVariables.color.white_default,
    padding: 15,
    gap: 15,
    paddingHorizontal: 15,
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  activeFilter: {
    backgroundColor: StyleVariables.color.green_faded,
  },
  filter: {
    backgroundColor: StyleVariables.color.soft_transparency,
  },
});
