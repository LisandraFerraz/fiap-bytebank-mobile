import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import { useAuth } from "@/contex/AuthContext";
import { StyleVariables } from "@/utils/constants/Colors";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <ThemedText style={{ marginBottom: 10 }} type="title">
        Autentique-se
      </ThemedText>
      <View style={styles.input_group}>
        <InputText
          label="e-mail"
          placeholder="seu.email@email.com"
          value={email}
          onChange={setEmail}
        />
        <InputText
          onChange={setPassword}
          label="senha"
          placeholder="sua senha"
          value={password}
        />
        <Button
          onClick={() => {
            login(email, password);
          }}
          diabled={false}
          name="Entrar"
        />
        <Link href={"/(auth)/signup"}>Não tem conta? Crie uma agora.</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleVariables.color.white_default,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  input_group: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    height: 500,
  },
});
