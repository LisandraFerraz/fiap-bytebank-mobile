import { arrayUnion, updateDoc } from "firebase/firestore";
import { showToastWithGravityAndOffset } from "../functions/toast";
import { Loan } from "../interfaces/transaction";
import { UseBank } from "./useBank";

export const useLoan = () => {
  const { getBankAccountData } = UseBank();

  const sendLoan = async (loanBody: Loan) => {
    const bankAccInfo = await getBankAccountData();
    try {
      if (bankAccInfo === null)
        return console.error("UseTed :: bankAccInfo is NULL ");

      await updateDoc(bankAccInfo.ref, {
        historicoEmprestimos: arrayUnion(loanBody),
      });
      showToastWithGravityAndOffset("Empréstimo criado!");
    } catch (error) {
      console.error("sendTED :: CATCH ERROR ", error);
      showToastWithGravityAndOffset("Ocorreu um erro...");
    }
  };

  const updateLoan = async (loanBody: Loan) => {
    const bankAccInfo = await getBankAccountData();
    try {
      if (!bankAccInfo) return console.error("UseTed :: bankAccInfo is NULL ");

      const targetLoan: any = bankAccInfo.data.historicoEmprestimos.find(
        (ln) => ln.transId === loanBody.transId
      );

      if (!targetLoan === undefined)
        return console.error("UseTed :: bankAccInfo is NULL ");

      let resValor =
        targetLoan.valor === loanBody.valor ? targetLoan.valor : loanBody.valor;

      let newValorDevido =
        targetLoan.valorDevido === loanBody.valorDevido
          ? targetLoan.valorDevido
          : loanBody.valorDevido;

      let debit = resValor! - newValorDevido!;

      const loanToUpdate: Loan = {
        ...loanBody,
        valorDevido: debit,
        aberto: debit > 0,
        valorPago: targetLoan.valorPago! + loanBody.valorPago!,
      };

      const updatedLoans = bankAccInfo.data.historicoEmprestimos.map(
        (em: Loan) =>
          em.transId === loanToUpdate.transId ? { ...em, ...loanToUpdate } : em
      );

      await updateDoc(bankAccInfo.ref, {
        historicoEmprestimos: updatedLoans,
      });
      showToastWithGravityAndOffset("Empréstimo atualizado!");
    } catch (error) {
      console.error("sendTED :: CATCH ERROR ", error);
      showToastWithGravityAndOffset("Ocorreu um erro...");
    }
  };

  const deleteLoan = async (loanId: string) => {
    const bankAccInfo = await getBankAccountData();
    try {
      if (bankAccInfo === null)
        return console.error("deleteLoan :: bankAccInfo is NULL ");

      const targetLoan = bankAccInfo.data.historicoEmprestimos.find(
        (ep) => ep.transId === loanId
      );
      const updatedLoans = bankAccInfo.data.historicoEmprestimos.filter(
        (ep) => ep.transId !== loanId
      );

      const updatedData = {
        ...bankAccInfo.data,
        saldo: bankAccInfo.data.saldo + targetLoan?.valorDevido!,
        historicoEmprestimos: updatedLoans,
      };

      await updateDoc(bankAccInfo.ref, updatedData);
      showToastWithGravityAndOffset("Empréstimo excluído!");
    } catch (error) {
      console.error("deleteLoan :: CATCH ERROR ", error);
      showToastWithGravityAndOffset("Ocorreu um erro...");
    }
  };

  return { sendLoan, updateLoan, deleteLoan };
};
