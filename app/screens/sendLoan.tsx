import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

import FormTemplate from "@/components/FormTemplate";
import { updateBody } from "@/components/ModalTransacao/transaction-forms/utils/update-body-func";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import { isAmountInvalid } from "@/utils/functions/form-validate/valor-validate";
import { FormatDate } from "@/utils/functions/format-data";
import { useLoan } from "@/utils/hooks/useLoan";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Loan } from "../../utils/interfaces/transaction";

export default function SendLoan() {
  const { sendLoan } = useLoan();

  const [loanBody, setLoanBody] = useState<Loan>(new Loan());

  const saveTransaction = () => {
    if (!isAmountInvalid(loanBody.valor)) {
      const dateToday = new Date();
      sendLoan({
        ...loanBody,
        data: FormatDate(dateToday),
        transId: uuid(),
      });
    }
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
              errorMessage={
                loanBody.valor && isAmountInvalid(loanBody.valor)
                  ? "- inválido"
                  : ""
              }
            />
          </View>

          <View style={[styles.row, styles.row_button]}>
            <Button
              disabled={false}
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
