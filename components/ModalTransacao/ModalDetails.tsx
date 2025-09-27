import EditPixForm from "@/components/ModalTransacao/transaction-forms/editPix";
import { transacao, TransacationTypes } from "@/utils/interfaces/transaction";
import { ReactNode, useState } from "react";
import { StyleSheet } from "react-native";
import ModalTemplate from "./ModalTemplate";
import EditDepositoForm from "./transaction-forms/editDeposito";
import EditEmprestimoForm from "./transaction-forms/editEmprestimo";
import EditTEDForm from "./transaction-forms/editTED";

export default function ModalTransactionDetails({
  shown,
  data,
  onClose,
}: {
  shown: boolean;
  data: transacao;
  onClose: () => void;
}) {
  //   useEffect(() => {
  //     console.log(data.tipo);
  //   });

  const [modalData, setModalData] = useState<any>(data);
  const [newFIle, setNewFile] = useState<boolean>(false);

  const checkFormType = (type: TransacationTypes) => {
    const getComponent: { [key: string]: ReactNode } = {
      [TransacationTypes.DEPOSITO]: (
        <EditDepositoForm data={modalData} newFile={newFIle} />
      ),
      [TransacationTypes.EMPRESTIMO]: (
        <EditEmprestimoForm data={modalData} newFile={newFIle} />
      ),
      [TransacationTypes.TED]: (
        <EditTEDForm data={modalData} newFile={newFIle} />
      ),
      [TransacationTypes.PIX]: (
        <EditPixForm data={modalData} newFile={newFIle} />
      ),
    };

    return getComponent[type];
  };

  return (
    <>
      {shown && data && (
        <ModalTemplate
          modalTitle="editar transação pix"
          onClose={onClose}
          isOpen={shown}
        >
          <>{checkFormType(modalData?.tipo)}</>
        </ModalTemplate>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
});
