import "react-native-get-random-values";

import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import { isAmountInvalid } from "@/utils/functions/form-validate/valor-validate";
import { useLoan } from "@/utils/hooks/useLoan";
import { Loan } from "@/utils/interfaces/transaction";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { updateBody } from "./utils/update-body-func";

export default function EditLoanForm({
  data,
  newFile,
}: {
  data: Loan;
  newFile: any;
}) {
  const { updateLoan, deleteLoan } = useLoan();

  const [loanBody, setLoanBody] = useState<Loan>(data);

  const sendUpdatedPix = () => {
    updateLoan(loanBody);
  };

  const handleDeleteLoan = () => {
    if (data.transId) deleteLoan(data.transId);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <InputText
            label="valor"
            placeholder="R$ 0"
            editable={true}
            onChange={(e: any) => updateBody(data, "valor", e, setLoanBody)}
            value={loanBody?.valor}
          />
          <View style={styles.row}>
            <InputText
              label="valor pago"
              placeholder="R$ 0"
              editable={true}
              onChange={(e: any) =>
                updateBody(loanBody, "valorPago", e, setLoanBody)
              }
              errorMessage={
                loanBody.valor && isAmountInvalid(loanBody.valor)
                  ? "- inválido"
                  : ""
              }
            />
          </View>
        </View>
      </View>
      <View style={[styles.row, styles.row_button]}>
        <Button disabled={false} name="Excluir" onClick={handleDeleteLoan} />
        <Button
          disabled={isAmountInvalid(loanBody.valor)}
          name="Confirmar"
          onClick={sendUpdatedPix}
        />
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
