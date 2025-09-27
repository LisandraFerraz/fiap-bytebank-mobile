import "react-native-get-random-values";

import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import { UsePix } from "@/utils/hooks/usePix";
import { IPix } from "@/utils/interfaces/transaction";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { updateBody } from "./shared/update-body-func";

export default function EditPixForm({
  data,
  newFile,
}: {
  data: IPix;
  newFile: any;
}) {
  const { updatePix } = UsePix();

  const [pixBody, setPixBody] = useState<IPix>(data);

  // const updateBody = (key: keyof IPix, value: string) => {
  //   setPixBody({
  //     ...data,
  //     [key]: key === "valor" ? Number(value) : value,
  //   });
  // };

  const sendUpdatedPix = () => {
    updatePix(pixBody);
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
          <Button
            diabled={false}
            name="Excluir"
            onClick={() => {
              /*func excl*/
            }}
          />
          <Button diabled={false} name="Confirmar" onClick={sendUpdatedPix} />
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
