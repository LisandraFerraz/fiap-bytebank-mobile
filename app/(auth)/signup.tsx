import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import { useAuth } from "@/contex/AuthContext";
import { StyleVariables } from "@/utils/constants/Colors";
import { BankAccount } from "@/utils/interfaces/bank-account";
import { UserData } from "@/utils/interfaces/user";
import { Link } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  const { signUp } = useAuth();

  const [userBody, setUserBody] = useState<UserData>(new UserData());
  const [bankAccBody, setBankAccBody] = useState<BankAccount>(
    new BankAccount()
  );

  const updateUserBody = (key: keyof UserData, value: string) => {
    setUserBody({
      ...userBody,
      [key]: value,
    });
  };

  const updateBankAccBody = (key: keyof BankAccount, value: string) => {
    setBankAccBody({
      ...bankAccBody,
      [key]: key === "saldo" || "linhaCredito" ? Number(value) : value,
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView>
          <ThemedText style={{ marginBottom: 10 }} type="title">
            Criar conta
          </ThemedText>
          <View style={styles.input_group}>
            <ThemedText style={{ marginBottom: 10 }} type="subtitle">
              Dados pessoais
            </ThemedText>
            <View>
              <InputText
                label="nome"
                placeholder="Seu nome"
                onChange={(e: any) => updateUserBody("name", e)}
              />
              <InputText
                label="e-mail"
                placeholder="seu.email@email.com"
                onChange={(e: any) => updateUserBody("email", e)}
              />
              <InputText
                label="cpf"
                placeholder="000.000.000-00"
                onChange={(e: any) => updateUserBody("cpf", e)}
              />
              <InputText
                label="data de nascimento"
                placeholder="DD/MM/AAAA"
                onChange={(e: any) => updateUserBody("birthDate", e)}
              />
              <InputText
                label="senha"
                placeholder="sua senha"
                onChange={(e: any) => updateUserBody("password", e)}
              />
            </View>

            <Link href={"/(auth)/signup"}>Já tem conta? Entre agora.</Link>
          </View>
          <View style={styles.input_group}>
            <ThemedText style={{ marginBottom: 10 }} type="subtitle">
              Dados bancários
            </ThemedText>
            <View style={styles.input_row}>
              <InputText
                label="conta"
                placeholder="000000"
                onChange={(e: any) => updateBankAccBody("numeroConta", e)}
              />
              <InputText
                label="agência"
                placeholder="000"
                onChange={(e: any) => updateBankAccBody("agencia", e)}
              />
              <InputText
                label="digíto"
                placeholder="0"
                onChange={(e: any) => updateBankAccBody("digito", e)}
              />
            </View>

            <View style={styles.input_row}>
              <InputText
                label="linha de crédito"
                placeholder="000"
                onChange={(e: any) => updateBankAccBody("linhaCredito", e)}
              />
              <InputText
                label="saldo"
                placeholder="R$ 0"
                onChange={(e: any) => updateBankAccBody("saldo", e)}
              />
            </View>
          </View>

          <Button
            onClick={() => {
              signUp(userBody, bankAccBody);
            }}
            diabled={false}
            name="cadastrar"
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
    backgroundColor: StyleVariables.color.white_default,
  },
  input_group: {
    marginVertical: 25,
    display: "flex",
    flexDirection: "column",
    gap: 15,
    height: 500,
  },
  input_row: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
});
