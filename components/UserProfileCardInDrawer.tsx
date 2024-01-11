import { StyleSheet, Image, useColorScheme } from "react-native";
import React from "react";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { useUserInfo } from "../store/AuthStore";
import { View, Text } from "./Themed";

const UserProfileCardInDrawer = () => {
  const colorScheme = useColorScheme();
  const userInfo = useUserInfo();
  return (
    <BlurView
      intensity={80}
      tint={!!colorScheme ? colorScheme : "default"}
      style={{ ...styles.card_container }}
    >
      <Image
        defaultSource={require("../assets/images/icon.png")}
        style={styles.avatar}
        source={{ uri: userInfo.avatar }}
      />
      <View style={styles.card_info_container}>
        <Text
          style={{
            ...styles.card_info_text,
            fontWeight: "bold",
            color:
              colorScheme === "dark"
                ? DarkTheme.colors.text
                : DefaultTheme.colors.text,
          }}
        >
          {userInfo.username}
        </Text>
        <Text
          style={{
            ...styles.card_info_text,
            color:
              colorScheme === "dark"
                ? DarkTheme.colors.text
                : DefaultTheme.colors.text,
          }}
        >
          {userInfo.group_name}
        </Text>
      </View>
    </BlurView>
  );
};

export default UserProfileCardInDrawer;

const styles = StyleSheet.create({
  card_container: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    margin: 12,
    borderRadius: 20,
    overflow: "hidden",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 65,
  },
  card_info_container: {
    flex: 1,
    gap: 4,
    marginLeft: 8,
    backgroundColor: "transparent",
  },
  card_info_text: {
    fontSize: 16,
    flexWrap: "wrap",
  },
});
