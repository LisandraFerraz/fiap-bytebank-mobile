import { arrayUnion, updateDoc } from "firebase/firestore";
import { Pix } from "../interfaces/transaction";
import { UseBank } from "./useBank";

export const UsePix = () => {
  const { getBankAccountData } = UseBank();

  const sendPix = async (pixBody: Pix) => {
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

  const updatePix = async (pixBody: Pix) => {
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
        console.log("updatePix :: SUCCESS ");
      } catch (error) {
        console.error("updatePix :: CATCH ERROR ", error);
      }
    });
  };

  const deletePix = (pixId: string) => {
    getBankAccountData().then(async (bankAccInfo) => {
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
      } catch (error) {
        console.error("deletePix :: CATCH ERROR ", error);
      }
    });
  };

  return { sendPix, updatePix, deletePix };
};
