import { StyleVariables } from "@/utils/constants/Colors";
import { UseCharts } from "@/utils/hooks/useCharts";
import { IChart } from "@/utils/interfaces/pie-chart";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { ThemedText } from "../ThemedText";

export const ExpensesChart = () => {
  const { listChartData } = UseCharts();

  const [chartData, setChartData] = useState<IChart[]>([]);

  useEffect(() => {
    listChartData().then((res) => {
      setChartData(res);
      console.log("ExpensesChart :: listChartData ", res);
    });
  }, []);

  if (!chartData.length) return null;

  return (
    <>
      <View style={styles.container}>
        <ThemedText type="defaultSemiBold">Gastos</ThemedText>
        <View style={styles.chartGroup}>
          <View>
            {chartData.map((cd: IChart) => (
              <View style={styles.dataTitleGroup} key={cd.text}>
                <View
                  style={{ backgroundColor: cd.color, width: 12, height: 12 }}
                />
                <Text>{cd.type}</Text>
              </View>
            ))}
          </View>
          <PieChart
            showText
            radius={100}
            textColor={StyleVariables.color.grey_font}
            textSize={14}
            fontWeight="bold"
            data={chartData}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleVariables.color.white_default,
    borderRadius: 10,
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 2,
    elevation: 2,
  },
  chartGroup: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  dataTitleGroup: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
});
