import { arrayUnion, updateDoc } from "firebase/firestore";
import { Deposito } from "../interfaces/transaction";
import { UseBank } from "./useBank";

export const UseDeposit = () => {
  const { getBankAccountData } = UseBank();

  const sendDeposit = async (depositBody: Deposito) => {
    getBankAccountData().then(async (bankAccInfo) => {
      try {
        if (bankAccInfo === null)
          return console.error("SendDepositendPix :: bankAccInfo is NULL ");

        const updatedSaldo = bankAccInfo.data.saldo + depositBody?.valor!;

        const updatedData = {
          ...bankAccInfo.data,
          saldo: updatedSaldo,
          depositos: arrayUnion(depositBody),
        };

        await updateDoc(bankAccInfo.ref, updatedData);
        console.log("sendDeposit :: PIX ADICIONADO ");
      } catch (error) {
        console.error("sendDeposit :: CATCH ERROR ", error);
      }
    });
  };

  const updateDeposit = (depositBody: Deposito) => {
    getBankAccountData().then(async (bankAccInfo) => {
      try {
        if (bankAccInfo === null)
          return console.error("SendDepositendPix :: bankAccInfo is NULL ");

        const updatedDeposits = bankAccInfo.data.depositos.map((dp) =>
          dp.transId === depositBody.transId ? { ...dp, ...depositBody } : dp
        );

        await updateDoc(bankAccInfo.ref, {
          depositos: updatedDeposits,
        });
        console.log("sendDeposit :: SUCCESS ");
      } catch (error) {
        console.error("updateDeposit :: CATCH ERROR ", error);
      }
    });
  };

  const deleteDeposit = (depositId: string) => {
    getBankAccountData().then(async (bankAccInfo) => {
      try {
        if (bankAccInfo === null)
          return console.error("deleteDeposit :: bankAccInfo is NULL ");

        const targetDeposit = bankAccInfo.data.depositos.find(
          (dp) => dp.transId === depositId
        );
        const updatedDeposits = bankAccInfo.data.depositos.filter(
          (dp) => dp.transId !== depositId
        );

        const updatedSaldo = bankAccInfo.data.saldo - targetDeposit?.valor!;

        if (updatedSaldo < 0)
          return console.error(
            "deleteDeposit :: targetDeposit.valor is bigger than SALDO."
          );

        const updatedData = {
          ...bankAccInfo.data,
          saldo: updatedSaldo,
          depositos: updatedDeposits,
        };

        await updateDoc(bankAccInfo.ref, updatedData);
        console.log("deleteDeposit :: SUCCESS ");
      } catch (error) {
        console.error("deleteDeposit :: CATCH ERROR ", error);
      }
    });
  };

  return { sendDeposit, updateDeposit, deleteDeposit };
};
