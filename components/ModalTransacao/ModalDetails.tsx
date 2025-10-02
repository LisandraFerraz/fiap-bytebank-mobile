import EditPixForm from "@/components/ModalTransacao/transaction-forms/editPix";
import { transacao, TransacationTypes } from "@/utils/interfaces/transaction";
import { ReactNode, useState } from "react";
import ModalTemplate from "./ModalTemplate";
import EditDepositoForm from "./transaction-forms/editDeposito";
import EditLoanForm from "./transaction-forms/editLoan";
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
  const [modalData, setModalData] = useState<any>(data);

  const checkFormType = (type: TransacationTypes) => {
    const getComponent: { [key: string]: ReactNode } = {
      [TransacationTypes.DEPOSITO]: <EditDepositoForm data={modalData} />,

      [TransacationTypes.EMPRESTIMO]: <EditLoanForm data={modalData} />,
      [TransacationTypes.TED]: <EditTEDForm data={modalData} />,
      [TransacationTypes.PIX]: <EditPixForm data={modalData} />,
    };

    return getComponent[type];
  };

  return (
    <>
      {shown && data && (
        <ModalTemplate modalTitle="editar" onClose={onClose} isOpen={shown}>
          <>{checkFormType(modalData?.tipo)}</>
        </ModalTemplate>
      )}
    </>
  );
}
