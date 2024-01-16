import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import Colors from "../../../constants/Colors";
import TabBarIcon from "../../../components/TabIcons";
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "TS-01",
          href: "/",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-boat-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ts_02"
        options={{
          title: "TS-02",
          href: "/ts_02",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="albums-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ts_03"
        options={{
          title: "TS-03",
          href: "/ts_03",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="albums-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
