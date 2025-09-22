import { StyleVariables } from "@/utils/constants/Colors";
import { View } from "react-native";

interface IDivisor {
  color: keyof typeof StyleVariables.color;
}

export default function Divisor({ color }: IDivisor) {
  return (
    <View
      style={{
        backgroundColor: StyleVariables.color[color],
        height: 1.2,
      }}
    ></View>
  );
}
