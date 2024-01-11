import { useEffect } from "react";
import { Dimensions, useColorScheme } from "react-native";
import { useAuthStore } from "../../store/AuthStore";
import Drawer from "expo-router/drawer";
import CustomDrawer from "../../components/CustomDrawer";
import Colors from "../../constants/Colors";
import TabBarIcon from "../../components/TabIcons";

export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    return () => {
      useAuthStore.persist.rehydrate();
    };
  }, []);

  return (
    <Drawer
      drawerContent={(props) => {
        return <CustomDrawer {...props} />;
      }}
      screenOptions={{
        drawerActiveTintColor: Colors[colorScheme ?? "light"].tint,
        drawerType: "slide",
        drawerPosition: "left",
        drawerStyle: {
          width: "45%",
        },
      }}
      initialRouteName="(tabs)"
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Home",
          headerTitle: "Home",
          headerShown: false,
          drawerIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="privacy-policy"
        options={{
          drawerLabel: "Privacy Policy",
          headerTitle: "Privacy Policy",
          drawerIcon: ({ color }) => (
            <TabBarIcon name="document-text-outline" color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
