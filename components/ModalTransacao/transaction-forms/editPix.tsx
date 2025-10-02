import "react-native-get-random-values";

import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import { isPixFormInvalid } from "@/utils/functions/form-validate/forms";
import { isAmountInvalid } from "@/utils/functions/form-validate/valor-validate";
import { UsePix } from "@/utils/hooks/usePix";
import { Pix } from "@/utils/interfaces/transaction";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { updateBody } from "./utils/update-body-func";

export default function EditPixForm({ data }: { data: Pix }) {
  const { updatePix, deletePix } = UsePix();

  const [pixBody, setPixBody] = useState<Pix>(data);

  const sendpixBody = () => {
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
            errorMessage={
              pixBody.valor && isAmountInvalid(pixBody.valor)
                ? "- inválido"
                : ""
            }
          />
        </View>
        <View style={styles.row}>
          <InputText
            label="chave pix (opcional)"
            placeholder="Chave PIX"
            onChange={(e: any) => updateBody(data, "chavePix", e, setPixBody)}
            editable={true}
            value={pixBody?.chavePix}
            errorMessage={
              pixBody.chavePix && String(pixBody.chavePix).length < 6
                ? "- insira mais de 6 dígitos"
                : ""
            }
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
            errorMessage={
              pixBody.destinatario && String(pixBody.destinatario).length < 3
                ? "- insira mais de 3 dígitos"
                : ""
            }
          />
        </View>

        <View style={styles.row}>
          <InputText
            label="descrição (opcional)"
            placeholder="Descrição..."
            onChange={(e: any) => updateBody(data, "descricao", e, setPixBody)}
            editable={true}
            value={pixBody?.descricao}
            errorMessage={
              pixBody.descricao && String(pixBody.descricao).length < 3
                ? "- insira mais de 3 dígitos"
                : ""
            }
          />
        </View>
        <View style={[styles.row, styles.row_button]}>
          <Button disabled={false} name="Excluir" onClick={handleDeleteLoan} />
          <Button
            disabled={isPixFormInvalid(pixBody)}
            name="Confirmar"
            onClick={sendpixBody}
          />
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
    justifyContent: "flex-end",
  },
});
