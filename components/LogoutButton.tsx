import {
  StyleSheet,
  View,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useAuthStore } from "../store/AuthStore";
import { BlurView } from "expo-blur";
import { Text } from "./Themed";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);
  const colorScheme = useColorScheme();
  return (
    <BlurView
      intensity={80}
      tint={!!colorScheme ? colorScheme : "default"}
      style={{ ...styles.container }}
    >
      <TouchableOpacity style={styles.touch_container} onPress={logout}>
        <Text
          style={{
            fontWeight: "400",
            fontSize: 16,
            color: Colors[colorScheme ?? "light"].tint,
          }}
        >
          Log out
        </Text>
        <FontAwesome5
          name="door-open"
          size={28}
          color={Colors[colorScheme ?? "light"].tint}
        />
      </TouchableOpacity>
    </BlurView>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    margin: 12,
    paddingVertical: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  touch_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
