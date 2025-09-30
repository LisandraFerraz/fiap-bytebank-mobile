import { Tabs } from "expo-router";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { Icon } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="extrato"
        options={{
          title: "Extrato",
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="0.square" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
