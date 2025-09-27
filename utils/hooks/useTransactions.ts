import { UseBank } from "./useBank";

export const UseTransactions = () => {
  const { getBankAccountData } = UseBank();

  const listAllTransactions = async (): Promise<any> => {
    try {
      const data = await getBankAccountData();

      if (!data) return [];

      const bankData = data?.data;
      const transferencias = bankData?.transferencias ?? [];
      const historicoEmprestimos = bankData?.historicoEmprestimos ?? [];
      const depositos = bankData?.depositos ?? [];

      if (!(transferencias || historicoEmprestimos || depositos)) return [];

      const transactionsList: any = [
        ...transferencias,
        ...historicoEmprestimos,
        ...depositos,
      ];

      console.log("UseTransactions :: listAllTransactions SUCESSO ");
      return transactionsList;
    } catch (error) {
      console.error("UseTransactions :: listAllTransactions ERROR ", error);
      return null;
    }
  };

  return { listAllTransactions };
};
