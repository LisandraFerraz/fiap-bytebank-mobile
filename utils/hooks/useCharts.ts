import { StyleVariables } from "../constants/Colors";
import { IChart } from "../interfaces/pie-chart";
import { UseBank } from "./useBank";

export const UseCharts = () => {
  const { getBankAccountData } = UseBank();

  const listChartData = async (): Promise<IChart[]> => {
    try {
      const data = await getBankAccountData();
      if (!data) return [];

      const bankData = data.data;
      const transferencias = bankData?.transferencias ?? [];

      const transferenciasPix = transferencias.filter(
        (tf) => tf.tipo === "PIX"
      );
      const transferenciasTed = transferencias.filter(
        (tf) => tf.tipo === "TED"
      );

      const totalPix = transferenciasPix.reduce(
        (acc, curr) => acc + Number(curr.valor || 0),
        0
      );

      const totalTed = transferenciasTed.reduce(
        (acc, curr) => acc + Number(curr.valor || 0),
        0
      );

      const chartColors = (vl1: number, vl2: number) => {
        if (vl1 > vl2) return StyleVariables.color.green_faded;
        return StyleVariables.color.grey_faded;
      };

      const expansesData: IChart[] = [
        {
          text: `R$ ${totalPix}`,
          color: chartColors(totalPix, totalTed),
          value: totalPix,
          type: "Pix",
        },
        {
          text: `R$ ${totalTed}`,
          color: chartColors(totalTed, totalPix),
          value: totalTed,
          type: "TED",
        },
      ];

      console.log("UseTransactions :: expansesData SUCESSO", expansesData);
      return expansesData;
    } catch (error) {
      console.error("UseTransactions :: listAllTransactions ERROR ", error);
      return [];
    }
  };

  return { listChartData };
};
