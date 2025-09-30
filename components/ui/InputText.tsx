import { StyleVariables } from "@/utils/constants/Colors";
import { StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "../ThemedText";

export default function InputText({
  value,
  maxLength,
  onChange,
  editable,
  // hasError,
  errorMessage,
  label,
  placeholder,
}: {
  value?: any;
  label: string;
  // hasError?: boolean;
  errorMessage?: string;
  maxLength?: number;
  editable?: boolean;
  placeholder: string;
  onChange?: any;
}) {
  return (
    <View style={styles.container}>
      <ThemedText
        style={styles.label}
        type={errorMessage ? "labelError" : "label"}
      >
        {label} {errorMessage}
      </ThemedText>
      <TextInput
        style={[styles.text_input, errorMessage ? styles.hasError : ""]}
        value={value}
        maxLength={maxLength || undefined}
        editable={editable || true}
        onChangeText={onChange}
        placeholder={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    flex: 1,
  },
  label: {
    fontSize: 14,
  },
  text_input: {
    backgroundColor: StyleVariables.color.white_default,
    borderRadius: 4,
    elevation: 1,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  hasError: {
    borderWidth: 1,
    borderColor: StyleVariables.color.red_highlight,
  },
});
