import "react-native-get-random-values";

import FormTemplate from "@/components/FormTemplate";
import { updateBody } from "@/components/ModalTransacao/transaction-forms/utils/update-body-func";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import { UseDeposit } from "@/utils/hooks/useDeposit";
import { Deposito } from "@/utils/interfaces/transaction";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SendDeposit() {
  const { sendDeposit } = UseDeposit();

  const [depositBody, setDepositBody] = useState<Deposito>(new Deposito());

  const saveDeposit = () => {
    sendDeposit(depositBody);
  };

  return (
    <>
      <FormTemplate title="Adicionar dinheiro ">
        <View style={styles.container}>
          <View style={styles.row}>
            <InputText
              label="valor"
              placeholder="R$ 0"
              editable={true}
              onChange={(e: any) =>
                updateBody(depositBody, "valor", e, setDepositBody)
              }
            />
          </View>
          <View style={[styles.row, styles.row_button]}>
            <Button diabled={false} name="Confirmar" onClick={saveDeposit} />
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
