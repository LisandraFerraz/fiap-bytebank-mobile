import { UseBank } from "./useBank";

export const UseTransactions = () => {
  const { getBankAccountData } = UseBank();

  const listAllTransactions = async ({
    itemsPage,
    currentPage,
  }: {
    itemsPage: number;
    currentPage: number;
  }): Promise<any> => {
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

      const totalItems = transactionsList.length;
      const items = Number(itemsPage) || Number(totalItems);
      const page = Number(currentPage) || 1;

      const inicio = items * (page - 1);
      const fim = inicio + items;

      const transactions = transactionsList.slice(inicio, fim);

      const paginacao = {
        totalItems: totalItems,
        itemsPage: items,
        currentPage: page,
      };

      console.log("UseTransactions :: listAllTransactions SUCESSO ");
      return {
        data: { transactions, paginacao },
      };
    } catch (error) {
      console.error("UseTransactions :: listAllTransactions ERROR ", error);
      return null;
    }
  };

  return { listAllTransactions };
};
