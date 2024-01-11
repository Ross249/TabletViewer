import { StyleSheet, Text, View, useColorScheme, Image } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const HomeBanner = () => {
  const theme = useColorScheme();
  return (
    <View style={styles.banner_container}>
      <View style={styles.banner_left_container}>
        <Text
          style={{
            fontSize: 36,
            color: Colors[theme === "light" ? "dark" : "light"].text,
          }}
        >
          Let's Explore
        </Text>
        <Text
          style={{
            fontSize: 36,
            color: Colors[theme === "light" ? "dark" : "light"].text,
          }}
        >
          TurboJET With Us!
        </Text>
      </View>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.banner_right_image}
      />
    </View>
  );
};

export default HomeBanner;

const styles = StyleSheet.create({
  banner_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  banner_left_container: {
    flexDirection: "column",
  },
  banner_right_image: {
    height: 100,
    resizeMode: "contain",
    width: "40%",
  },
});
