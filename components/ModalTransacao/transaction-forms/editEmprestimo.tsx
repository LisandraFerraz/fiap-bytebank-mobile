import "react-native-get-random-values";

import Button from "@/components/ui/Button";
import { UsePix } from "@/utils/hooks/usePix";
import { IPix } from "@/utils/interfaces/transaction";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function EditEmprestimoForm({
  data,
  newFile,
}: {
  data: IPix;
  newFile: any;
}) {
  const { updatePix } = UsePix();

  const [emprestimoBody, setEmprestimoBody] = useState<IPix>(data);

  //   const updateBody = (key: keyof IPix, value: string) => {
  //     setEmprestimoBody({
  //       ...data,
  //       [key]: key === "valor" ? Number(value) : value,
  //     });
  //   };

  const sendUpdatedPix = () => {
    updatePix(emprestimoBody);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          {/* <InputText
            label="valor"
            placeholder="R$ 0"
            editable={true}
            onChange={(e: any) => updateBody(data, "valor", e, setEmprestimoBody)}
            value={emprestimoBody?.valor}
          /> */}
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
