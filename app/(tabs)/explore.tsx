import { Animated, Button, StyleSheet, Text, View } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const fadeAnim = useSharedValue(0);

  const reanimStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });

  const fadeIn = () => {
    fadeAnim.value = withTiming(1, { duration: 3000 });
  };

  const fadeOut = () => {
    fadeAnim.value = withTiming(0, { duration: 6000 });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.FadeInContainer, reanimStyle]}>
        <Text>Hello, World</Text>
      </Animated.View>
      <View style={styles.actions}>
        <Button onPress={fadeIn} title="Fade in"></Button>
        <Button onPress={fadeOut} title="Fade out"></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actions: {
    flexBasis: 100,
    justifyContent: "space-evenly",
    marginVertical: 16,
  },
  FadeInContainer: {
    padding: 20,
    backgroundColor: "powderblue",
  },
});
