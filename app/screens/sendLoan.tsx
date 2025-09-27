import "react-native-get-random-values";
import { Loan } from "../../utils/interfaces/transaction";

import FormTemplate from "@/components/FormTemplate";
import { updateBody } from "@/components/ModalTransacao/transaction-forms/utils/update-body-func";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SendLoan() {
  //   const { sendTED } = UseTed();

  const [loanBody, setLoanBody] = useState<Loan>(new Loan());

  const saveTransaction = () => {
    // sendTED(loanBody);
  };

  return (
    <>
      <FormTemplate title="Registrar empréstimo">
        <View style={styles.container}>
          <View style={styles.row}>
            <InputText
              label="valor"
              placeholder="R$ 0"
              editable={true}
              onChange={(e: any) =>
                updateBody(loanBody, "valor", e, setLoanBody)
              }
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
