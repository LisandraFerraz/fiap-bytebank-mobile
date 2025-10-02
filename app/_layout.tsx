import { AuthProvider } from "@/contex/AuthContext";
import { LoaderProvider } from "@/contex/LoaderContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <>
      <AuthProvider>
        <LoaderProvider>
          <Stack>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(protected)" />
          </Stack>
        </LoaderProvider>
      </AuthProvider>
    </>
  );
}
