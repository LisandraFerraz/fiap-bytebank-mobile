import { router } from "expo-router";
import { arrayUnion, updateDoc } from "firebase/firestore";
import { showToastWithGravityAndOffset } from "../functions/toast";
import { Ted } from "../interfaces/transaction";
import { UseBank } from "./useBank";

export default function UseTed() {
  const { getBankAccountData } = UseBank();

  const sendTED = async (tedBody: Ted) => {
    const bankAccInfo = await getBankAccountData();
    try {
      if (bankAccInfo === null)
        return console.error("UseTed :: bankAccInfo is NULL ");

      await updateDoc(bankAccInfo.ref, {
        transferencias: arrayUnion(tedBody),
      });
      router.replace("/");
      showToastWithGravityAndOffset("TED enviado!");
    } catch (error) {
      console.error("sendTED :: CATCH ERROR ", error);
      showToastWithGravityAndOffset("Ocorreu um erro...");
    }
  };

  const updateTED = async (tedBody: Ted) => {
    const bankAccInfo = await getBankAccountData();
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
      router.replace("/");
      showToastWithGravityAndOffset("TED atualizado!");
    } catch (error) {
      console.error("updateTED :: CATCH ERROR ", error);
      showToastWithGravityAndOffset("Ocorreu um erro...");
    }
  };

  const deleteTed = async (tedId: string) => {
    const bankAccInfo = await getBankAccountData();
    try {
      if (bankAccInfo === null)
        return console.error("deleteTed :: bankAccInfo is NULL ");

      const targetTrans = bankAccInfo.data.transferencias.find(
        (ep) => ep.transId === tedId
      );
      const updatedTrans = bankAccInfo.data.transferencias.filter(
        (ep) => ep.transId !== tedId
      );

      const updatedData = {
        ...bankAccInfo.data,
        saldo: bankAccInfo.data.saldo - targetTrans?.valor!,
        transferencias: updatedTrans,
      };

      await updateDoc(bankAccInfo.ref, updatedData);
      showToastWithGravityAndOffset("TED excluído!");
    } catch (error) {
      console.error("deleteTed :: CATCH ERROR ", error);
      showToastWithGravityAndOffset("Ocorreu um erro...");
    }
  };

  return { sendTED, updateTED, deleteTed };
}
