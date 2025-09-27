import "react-native-get-random-values";

import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import UseTed from "@/utils/hooks/useTED";
import { Ted } from "@/utils/interfaces/transaction";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { updateBody } from "./utils/update-body-func";

export default function EditTEDForm({
  data,
  newFile,
}: {
  data: Ted;
  newFile: any;
}) {
  const { updateTED } = UseTed();

  const [tedBody, setTEDBody] = useState<Ted>(data);

  const sendUpdatedTed = () => {
    updateTED(tedBody);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <InputText
            value={tedBody.valor}
            label="valor"
            placeholder="R$ 0"
            editable={true}
            onChange={(e: any) => updateBody(data, "valor", e, setTEDBody)}
          />
        </View>
        <View style={styles.row}>
          <InputText
            value={tedBody.cpfDestinatario}
            label="CPF Destinatário (opcional)"
            placeholder="000.000.000-00"
            editable={true}
            onChange={(e: any) =>
              updateBody(data, "cpfDestinatario", e, setTEDBody)
            }
          />
        </View>
        <View style={styles.row}>
          <InputText
            value={tedBody.numConta}
            label="Conta"
            placeholder="000000 (opcional)"
            editable={true}
            onChange={(e: any) => updateBody(data, "numConta", e, setTEDBody)}
          />
        </View>
        <View style={styles.row}>
          <InputText
            value={tedBody.agencia}
            label="Agência (opcional)"
            placeholder="000"
            editable={true}
            onChange={(e: any) => updateBody(data, "agencia", e, setTEDBody)}
          />
        </View>
        <View style={styles.row}>
          <InputText
            value={tedBody.digito}
            editable={true}
            label="Digito (opcional)"
            placeholder="0"
            onChange={(e: any) => updateBody(data, "digito", e, setTEDBody)}
          />
        </View>
        <View style={styles.row}>
          <InputText
            value={tedBody.descricao}
            editable={true}
            label="descrição (opcional)"
            placeholder="Descrição..."
            onChange={(e: any) => updateBody(data, "descricao", e, setTEDBody)}
          />
        </View>
      </View>
      <View style={[styles.row, styles.row_button]}>
        <Button
          diabled={false}
          name="Excluir"
          onClick={() => {
            /*func excl*/
          }}
        />
        <Button diabled={false} name="Confirmar" onClick={sendUpdatedTed} />
      </View>
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
  },
});
