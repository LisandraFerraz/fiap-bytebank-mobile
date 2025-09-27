import { arrayUnion, updateDoc } from "firebase/firestore";
import { Ted } from "../interfaces/transaction";
import { UseBank } from "./useBank";

export default function UseTed() {
  const { getBankAccountData } = UseBank();

  const sendTED = (tedBody: Ted) => {
    getBankAccountData().then(async (bankAccInfo) => {
      try {
        if (bankAccInfo === null)
          return console.error("UseTed :: bankAccInfo is NULL ");

        await updateDoc(bankAccInfo.ref, {
          transferencias: arrayUnion(tedBody),
        });
      } catch (error) {
        console.error("sendTED :: CATCH ERROR ", error);
      }
    });
  };

  const updateTED = (tedBody: Ted) => {
    getBankAccountData().then(async (bankAccInfo) => {
      try {
        if (bankAccInfo === null)
          return console.error("UseTed :: bankAccInfo is NULL ");

        const updatedTrans = bankAccInfo.data.transferencias.map((tf: any) =>
          tf.transId === tedBody.transId ? { ...tf, ...tedBody } : tf
        );

        await updateDoc(bankAccInfo.ref, {
          transferencias: updatedTrans,
        });
        console.log("updateTED :: SUCESSO ");
      } catch (error) {
        console.error("updateTED :: CATCH ERROR ", error);
      }
    });
  };

  return { sendTED, updateTED };
}
