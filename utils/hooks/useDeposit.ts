import { arrayUnion, updateDoc } from "firebase/firestore";
import { Deposito } from "../interfaces/transaction";
import { UseBank } from "./useBank";

export const UseDeposit = () => {
  const { getBankAccountData } = UseBank();

  const sendDeposit = async (depositBody: Deposito) => {
    getBankAccountData().then(async (bankAccInfo) => {
      try {
        if (bankAccInfo === null)
          return console.error("SsendDepositendPix :: bankAccInfo is NULL ");

        await updateDoc(bankAccInfo.ref, {
          transferencias: arrayUnion(depositBody),
        });
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
          return console.error("SsendDepositendPix :: bankAccInfo is NULL ");

        const updatedDeposits = bankAccInfo.data.depositos.map((dp) =>
          dp.transId === depositBody.transId ? { ...dp, ...depositBody } : dp
        );

        await updateDoc(bankAccInfo.ref, {
          depositos: updatedDeposits,
        });
        console.log("sendDeposit :: SUCCESS ");
      } catch (error) {
        console.error("sendDeposit :: CATCH ERROR ", error);
      }
    });
  };

  return { sendDeposit, updateDeposit };
};
