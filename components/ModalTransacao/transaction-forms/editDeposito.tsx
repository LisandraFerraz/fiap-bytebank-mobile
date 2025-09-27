import "react-native-get-random-values";

import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import { UseDeposit } from "@/utils/hooks/useDeposit";
import { Deposito } from "@/utils/interfaces/transaction";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { updateBody } from "./utils/update-body-func";

export default function EditDepositoForm({
  data,
  newFile,
}: {
  data: Deposito;
  newFile: any;
}) {
  const { updateDeposit } = UseDeposit();

  const [depositBody, setDepositBody] = useState<Deposito>(data);

  const sendUpdatedPix = () => {
    updateDeposit(depositBody);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <InputText
            label="valor"
            placeholder="R$ 0"
            editable={true}
            onChange={(e: any) => updateBody(data, "valor", e, setDepositBody)}
            value={depositBody?.valor}
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
        <Button diabled={false} name="Confirmar" onClick={sendUpdatedPix} />
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
