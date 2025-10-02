import { router } from "expo-router";
import { arrayUnion, updateDoc } from "firebase/firestore";
import { showToastWithGravityAndOffset } from "../functions/toast";
import { Pix } from "../interfaces/transaction";
import { UseBank } from "./useBank";

export const UsePix = () => {
  const { getBankAccountData } = UseBank();

  const sendPix = async (pixBody: Pix) => {
    const bankAccInfo = await getBankAccountData();
    try {
      if (bankAccInfo === null)
        return console.error("SendPix :: bankAccInfo is NULL ");

      await updateDoc(bankAccInfo.ref, {
        transferencias: arrayUnion(pixBody),
      });
      router.replace("/");
      showToastWithGravityAndOffset("PIX enviado!");
    } catch (error) {
      console.error("sendPix :: CATCH ERROR ", error);
      showToastWithGravityAndOffset("Ocorreu um erro...");
    }
  };

  const updatePix = async (pixBody: Pix) => {
    const bankAccInfo = await getBankAccountData();
    try {
      if (bankAccInfo === null) {
        return console.error("updatePix :: bankAccInfo is NULL ");
      }

      const bankData = bankAccInfo.data;

      const updatedTrans = bankData.transferencias.map((t: any) =>
        t.transId === pixBody.transId ? { ...t, ...pixBody } : t
      );

      await updateDoc(bankAccInfo.ref, { transferencias: updatedTrans });

      router.replace("/");
      showToastWithGravityAndOffset("PIX atualizado!");
    } catch (error) {
      console.error("updatePix :: CATCH ERROR ", error);
      showToastWithGravityAndOffset("Ocorreu um erro...");
    }
  };

  const deletePix = async (pixId: string) => {
    const bankAccInfo = await getBankAccountData();
    try {
      if (bankAccInfo === null)
        return console.error("deletePix :: bankAccInfo is NULL ");

      const targetTrans = bankAccInfo.data.transferencias.find(
        (ep) => ep.transId === pixId
      );
      const updatedTrans = bankAccInfo.data.transferencias.filter(
        (ep) => ep.transId !== pixId
      );

      const updatedData = {
        ...bankAccInfo.data,
        saldo: bankAccInfo.data.saldo - targetTrans?.valor!,
        transferencias: updatedTrans,
      };

      await updateDoc(bankAccInfo.ref, updatedData);
      showToastWithGravityAndOffset("PIX excluído!");
    } catch (error) {
      console.error("deletePix :: CATCH ERROR ", error);
      showToastWithGravityAndOffset("Ocorreu um erro...");
    }
  };

  return { sendPix, updatePix, deletePix };
};
