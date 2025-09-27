import { arrayUnion, updateDoc } from "firebase/firestore";
import { Loan } from "../interfaces/transaction";
import { UseBank } from "./useBank";

export const useLoan = () => {
  const { getBankAccountData } = UseBank();

  const sendLoan = (tedBody: Loan) => {
    getBankAccountData().then(async (bankAccInfo) => {
      try {
        if (bankAccInfo === null)
          return console.error("UseTed :: bankAccInfo is NULL ");

        await updateDoc(bankAccInfo.ref, {
          historicoEmprestimos: arrayUnion(tedBody),
        });
      } catch (error) {
        console.error("sendTED :: CATCH ERROR ", error);
      }
    });
  };

  const updateLoan = (loanBody: Loan) => {
    getBankAccountData().then(async (bankAccInfo) => {
      try {
        if (bankAccInfo === null)
          return console.error("UseTed :: bankAccInfo is NULL ");

        const targetLoan: Loan =
          bankAccInfo.data.historicoEmprestimos.find(
            (ln) => ln.transId === loanBody.transId
          ) ?? {};

        if (!targetLoan === undefined)
          return console.error("UseTed :: bankAccInfo is NULL ");

        let resValor =
          targetLoan.valor === loanBody.valor
            ? targetLoan.valor
            : loanBody.valor;

        // // if valorPago from body is the same as what's already saved, it wont' change
        // let resValorDevido =
        //   loanBody.valorPago === targetLoan.valorPago
        //     ? targetLoan.valorDevido
        //     : targetLoan.valorDevido! - loanBody.valorPago!;

        let newValorDevivo =
          targetLoan.valorDevido === loanBody.valorDevido
            ? targetLoan.valorDevido
            : loanBody.valorDevido;

        let debit = resValor! - newValorDevivo!;

        const loanToUpdate: Loan = {
          ...loanBody,
          valorDevido: debit,
          aberto: debit > 0,
          valorPago: targetLoan.valorPago! + loanBody.valorPago!,
        };

        const updatedLoans = bankAccInfo.data.historicoEmprestimos.map(
          (em: Loan) =>
            em.transId === loanToUpdate.transId
              ? { ...em, ...loanToUpdate }
              : em
        );

        await updateDoc(bankAccInfo.ref, {
          historicoEmprestimos: updatedLoans,
        });
      } catch (error) {
        console.error("sendTED :: CATCH ERROR ", error);
      }
    });
  };

  return { sendLoan, updateLoan };
};
