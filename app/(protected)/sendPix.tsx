import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

import FormTemplate from "@/components/FormTemplate";
import { updateBody } from "@/components/ModalTransacao/transaction-forms/utils/update-body-func";
import { AttachBtn } from "@/components/ui/AttachBtn";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import { pickImage } from "@/utils/functions/attach-file";
import { isPixFormInvalid } from "@/utils/functions/form-validate/forms";
import { isAmountInvalid } from "@/utils/functions/form-validate/valor-validate";
import { FormatDate } from "@/utils/functions/format-data";
import { UsePix } from "@/utils/hooks/usePix";
import { UseSaveImg } from "@/utils/hooks/useSaveImg";
import { Pix } from "@/utils/interfaces/transaction";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SendPix() {
  const { sendPix } = UsePix();
  const { uploadImage } = UseSaveImg();

  const [pixBody, setPixBody] = useState<Pix>(new Pix());

  const saveTransaction = () => {
    if (!isPixFormInvalid(pixBody)) {
      const dateToday = new Date();
      sendPix({
        ...pixBody,
        data: FormatDate(dateToday),
        transId: uuid(),
      });
    }
  };

  const handleAttachImg = async () => {
    console.log("hello");
    const imgUrl = await pickImage();

    if (imgUrl) {
      const url = await uploadImage(imgUrl);
      setPixBody({ ...pixBody, file: url });
    }
  };

  return (
    <>
      <FormTemplate title="Registrar PIX ">
        <View style={styles.container}>
          <View style={styles.row}>
            <AttachBtn onPress={() => handleAttachImg()} />
          </View>
          <View style={styles.row}>
            <InputText
              label="valor"
              placeholder="R$ 0"
              editable={true}
              onChange={(e: any) => updateBody(pixBody, "valor", e, setPixBody)}
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
              onChange={(e: any) =>
                updateBody(pixBody, "chavePix", e, setPixBody)
              }
              editable={true}
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
                updateBody(pixBody, "destinatario", e, setPixBody)
              }
              editable={true}
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
              onChange={(e: any) =>
                updateBody(pixBody, "descricao", e, setPixBody)
              }
              editable={true}
              errorMessage={
                pixBody.descricao && String(pixBody.descricao).length < 3
                  ? "- insira mais de 3 dígitos"
                  : ""
              }
            />
          </View>
          <View style={[styles.row, styles.row_button]}>
            <Button
              disabled={isPixFormInvalid(pixBody)}
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
