import { arrayUnion, updateDoc } from "firebase/firestore";
import { IPix } from "../interfaces/transaction";
import { UseBank } from "./useBank";

export const UsePix = () => {
  const { getBankAccountData } = UseBank();

  const sendPix = async (pixBody: IPix) => {
    getBankAccountData().then(async (bankAccInfo) => {
      try {
        if (bankAccInfo === null)
          return console.error("SendPix :: bankAccInfo is NULL ");

        await updateDoc(bankAccInfo.ref, {
          transferencias: arrayUnion(pixBody),
        });
        console.log("sendPix :: PIX ADICIONADO ");
      } catch (error) {
        console.error("sendPix :: CATCH ERROR ", error);
      }
    });
  };

  const updatePix = async (pixBody: IPix) => {
    getBankAccountData().then(async (bankAccInfo) => {
      try {
        if (bankAccInfo === null) {
          return console.error("updatePix :: bankAccInfo is NULL ");
        }

        const bankData = bankAccInfo.data;

        const updatedTrans = bankData.transferencias.map((t: any) =>
          t.transId === pixBody.transId ? { ...t, ...pixBody } : t
        );

        await updateDoc(bankAccInfo.ref, { transferencias: updatedTrans });
        console.log("updatePix :: SUCESSO ");
      } catch (error) {
        console.error("updatePix :: CATCH ERROR ", error);
      }
    });
  };

  return { sendPix, updatePix };
};
