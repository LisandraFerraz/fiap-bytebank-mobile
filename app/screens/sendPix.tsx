import FormTemplate from "@/components/FormTemplate";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import { StyleSheet, View } from "react-native";

export default function sendPix() {
  return (
    <FormTemplate title="Enviar PIX ">
      <View style={styles.container}>
        <View style={styles.row}>
          <InputText
            label="valor"
            placeholder="R$ 0"
            value=""
            editable={true}
          />
        </View>
        <View style={styles.row}>
          <InputText
            label="chave pix (opcional)"
            placeholder="Chave PIX"
            value=""
            editable={true}
          />
        </View>

        <View style={styles.row}>
          <InputText
            label="destinatário"
            placeholder="Destinatário"
            value=""
            editable={true}
          />
        </View>

        <View style={styles.row}>
          <InputText
            label="descrição (opcional)"
            placeholder="Descrição..."
            value=""
            editable={true}
          />
        </View>
        <View style={[styles.row, styles.row_button]}>
          <Button diabled={false} name="Confirmar" onClick={() => {}} />
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
