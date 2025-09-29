import "react-native-get-random-values";

import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import { UsePix } from "@/utils/hooks/usePix";
import { Pix } from "@/utils/interfaces/transaction";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { updateBody } from "./utils/update-body-func";

export default function EditPixForm({
  data,
  newFile,
}: {
  data: Pix;
  newFile: any;
}) {
  const { updatePix, deletePix } = UsePix();

  const [pixBody, setPixBody] = useState<Pix>(data);

  const sendUpdatedPix = () => {
    updatePix(pixBody);
  };

  const handleDeleteLoan = () => {
    if (data.transId) {
      deletePix(data.transId);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <InputText
            label="valor"
            placeholder="R$ 0"
            editable={true}
            onChange={(e: any) => updateBody(data, "valor", e, setPixBody)}
            value={pixBody?.valor}
          />
        </View>
        <View style={styles.row}>
          <InputText
            label="chave pix (opcional)"
            placeholder="Chave PIX"
            onChange={(e: any) => updateBody(data, "chavePix", e, setPixBody)}
            editable={true}
            value={pixBody?.chavePix}
          />
        </View>

        <View style={styles.row}>
          <InputText
            label="destinatário"
            placeholder="Destinatário"
            onChange={(e: any) =>
              updateBody(data, "destinatario", e, setPixBody)
            }
            editable={true}
            value={pixBody?.destinatario}
          />
        </View>

        <View style={styles.row}>
          <InputText
            label="descrição (opcional)"
            placeholder="Descrição..."
            onChange={(e: any) => updateBody(data, "descricao", e, setPixBody)}
            editable={true}
            value={pixBody?.descricao}
          />
        </View>
        <View style={[styles.row, styles.row_button]}>
          <Button disabled={false} name="Excluir" onClick={handleDeleteLoan} />
          <Button disabled={false} name="Confirmar" onClick={sendUpdatedPix} />
        </View>
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
