import FormTemplate from "@/components/FormTemplate";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import { FormatDate } from "@/utils/functions/format-data";
import { IPix } from "@/utils/interfaces/transaction";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SendPix() {
  const [pixBody, setPixBody] = useState<IPix>(new IPix());

  const updateBody = (key: keyof IPix, value: string) => {
    const dateToday = new Date();

    setPixBody({
      ...pixBody,
      [key]: key === "valor" ? Number(value) : value,
      data: FormatDate(dateToday),
    });
  };

  const saveTransaction = () => {
    console.log(pixBody);
  };

  return (
    <FormTemplate title="Enviar PIX ">
      <View style={styles.container}>
        <View style={styles.row}>
          <InputText
            label="valor"
            placeholder="R$ 0"
            editable={true}
            onChange={(e: any) => updateBody("valor", e)}
          />
        </View>
        <View style={styles.row}>
          <InputText
            label="chave pix (opcional)"
            placeholder="Chave PIX"
            onChange={(e: any) => updateBody("chavePix", e)}
            editable={true}
          />
        </View>

        <View style={styles.row}>
          <InputText
            label="destinatário"
            placeholder="Destinatário"
            onChange={(e: any) => updateBody("destinatario", e)}
            editable={true}
          />
        </View>

        <View style={styles.row}>
          <InputText
            label="descrição (opcional)"
            placeholder="Descrição..."
            onChange={(e: any) => updateBody("descricao", e)}
            editable={true}
          />
        </View>
        <View style={[styles.row, styles.row_button]}>
          <Button diabled={false} name="Confirmar" onClick={saveTransaction} />
        </View>
      </View>
    </FormTemplate>
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
