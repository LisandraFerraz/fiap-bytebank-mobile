import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

import FormTemplate from "@/components/FormTemplate";
import { updateBody } from "@/components/ModalTransacao/transaction-forms/utils/update-body-func";
import { AttachBtn } from "@/components/ui/AttachBtn";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import { handleAttachImg } from "@/utils/functions/attach-file";
import { isTedFormInvalid } from "@/utils/functions/form-validate/forms";
import { isAmountInvalid } from "@/utils/functions/form-validate/valor-validate";
import { FormatDate } from "@/utils/functions/format-data";
import UseTed from "@/utils/hooks/useTED";
import { Ted } from "@/utils/interfaces/transaction";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SendTED() {
  const { sendTED } = UseTed();

  const [tedBody, setTEDBody] = useState<Ted>(new Ted());

  const saveTransaction = () => {
    if (!isTedFormInvalid(tedBody)) {
      const dateToday = new Date();
      sendTED({
        ...tedBody,
        data: FormatDate(dateToday),
        transId: uuid(),
      });
    }
  };

  return (
    <>
      <FormTemplate title="Registrar tranferência bancária">
        <View style={styles.container}>
          <View style={styles.row}>
            <AttachBtn onPress={() => handleAttachImg(setTEDBody, tedBody)} />
          </View>
          <View style={styles.row}>
            <InputText
              label="valor"
              placeholder="R$ 0"
              editable={true}
              onChange={(e: any) => updateBody(tedBody, "valor", e, setTEDBody)}
              errorMessage={
                tedBody.valor && isAmountInvalid(tedBody.valor)
                  ? "- inválido"
                  : ""
              }
            />
          </View>
          <View style={styles.row}>
            <InputText
              label="CPF Destinatário (opcional)"
              placeholder="000.000.000-00"
              editable={true}
              onChange={(e: any) =>
                updateBody(tedBody, "cpfDestinatario", e, setTEDBody)
              }
              errorMessage={
                tedBody.cpfDestinatario &&
                String(tedBody.cpfDestinatario).length < 11
                  ? "- inválido"
                  : ""
              }
            />
          </View>
          <View style={styles.row}>
            <InputText
              label="Conta"
              placeholder="000000 (opcional)"
              editable={true}
              onChange={(e: any) =>
                updateBody(tedBody, "numConta", e, setTEDBody)
              }
              errorMessage={
                tedBody.numConta && String(tedBody.numConta).length < 6
                  ? "- insira 6 dígitos"
                  : ""
              }
            />
          </View>
          <View style={styles.row}>
            <InputText
              label="Agência (opcional)"
              placeholder="000"
              editable={true}
              onChange={(e: any) =>
                updateBody(tedBody, "agencia", e, setTEDBody)
              }
              errorMessage={
                tedBody.agencia && tedBody.agencia.length < 3
                  ? "- insira 3 dígitos"
                  : ""
              }
            />
          </View>
          <View style={styles.row}>
            <InputText
              editable={true}
              label="Digito (opcional)"
              placeholder="0"
              onChange={(e: any) =>
                updateBody(tedBody, "digito", e, setTEDBody)
              }
              errorMessage={
                tedBody.descricao && String(tedBody.descricao).length < 3
                  ? "- insira mais de 3 dígitos"
                  : ""
              }
            />
          </View>
          <View style={styles.row}>
            <InputText
              editable={true}
              label="descrição (opcional)"
              placeholder="Descrição..."
              onChange={(e: any) =>
                updateBody(tedBody, "descricao", e, setTEDBody)
              }
            />
          </View>
          <View style={[styles.row, styles.row_button]}>
            <Button
              disabled={isTedFormInvalid(tedBody)}
              name="Confirmar"
              onClick={saveTransaction}
            />
          </View>
        </View>
      </FormTemplate>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
  row: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row_button: {
    marginTop: 10,
    justifyContent: "flex-end",
  },
});
