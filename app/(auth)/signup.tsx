import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import { useAuth } from "@/contex/AuthContext";
import { StyleVariables } from "@/utils/constants/Colors";
import { UserData } from "@/utils/interfaces/user";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SignUp() {
  const { signUp } = useAuth();

  const [signUpBody, setSignUpBody] = useState<UserData>(new UserData());

  const updateBody = (key: keyof UserData, value: string) => {
    setSignUpBody({
      ...signUpBody,
      [key]: value,
    });
  };

  return (
    <View style={styles.container}>
      <ThemedText style={{ marginBottom: 10 }} type="title">
        Criar conta
      </ThemedText>
      <View style={styles.input_group}>
        <InputText
          label="nome"
          placeholder="Seu nome"
          onChange={(e: any) => updateBody("name", e)}
        />
        <InputText
          label="e-mail"
          placeholder="seu.email@email.com"
          onChange={(e: any) => updateBody("email", e)}
        />
        <InputText
          label="cpf"
          placeholder="000.000.000-00"
          onChange={(e: any) => updateBody("cpf", e)}
        />
        <InputText
          label="data de nascimento"
          placeholder="DD/MM/AAAA"
          onChange={(e: any) => updateBody("birthDate", e)}
        />
        <InputText
          label="senha"
          placeholder="sua senha"
          onChange={(e: any) => updateBody("password", e)}
        />
        <Button
          onClick={() => {
            signUp(signUpBody);
          }}
          diabled={false}
          name="cadastrar"
        />
        <Link href={"/(auth)/signup"}>Já tem conta? Entre agora.</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
    backgroundColor: StyleVariables.color.white_default,
  },
  input_group: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    height: 500,
  },
});
