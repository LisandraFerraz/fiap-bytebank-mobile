import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

import FormTemplate from "@/components/FormTemplate";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import { FormatDate } from "@/utils/functions/format-data";
import UseTed from "@/utils/hooks/useTED";
import { Ted } from "@/utils/interfaces/transaction";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SendTED() {
  const { sendTED } = UseTed();

  const [tedBody, setTEDBody] = useState<Ted>(new Ted());

  const updateBody = (key: keyof Ted, value: string) => {
    const dateToday = new Date();
    setTEDBody({
      ...tedBody,
      [key]: key === "valor" ? Number(value) : value,
      data: FormatDate(dateToday),
      transId: uuid(),
    });
  };

  const saveTransaction = () => {
    sendTED(tedBody);
  };

  return (
    <>
      <FormTemplate title="Registrar tranferência bancária">
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
              label="CPF Destinatário (opcional)"
              placeholder="000.000.000-00"
              editable={true}
              onChange={(e: any) => updateBody("cpfDestinatario", e)}
            />
          </View>
          <View style={styles.row}>
            <InputText
              label="Conta"
              placeholder="000000 (opcional)"
              editable={true}
              onChange={(e: any) => updateBody("numConta", e)}
            />
          </View>
          <View style={styles.row}>
            <InputText
              label="Agência (opcional)"
              placeholder="000"
              editable={true}
              onChange={(e: any) => updateBody("agencia", e)}
            />
          </View>
          <View style={styles.row}>
            <InputText
              editable={true}
              label="Digito (opcional)"
              placeholder="0"
              onChange={(e: any) => updateBody("digito", e)}
            />
          </View>
          <View style={styles.row}>
            <InputText
              editable={true}
              label="descrição (opcional)"
              placeholder="Descrição..."
              onChange={(e: any) => updateBody("descricao", e)}
            />
          </View>

          <View style={[styles.row, styles.row_button]}>
            <Button
              diabled={false}
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
  },
});
