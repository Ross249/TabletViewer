import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const LinearGradientBackground = () => {
  const theme = useColorScheme();
  return (
    <LinearGradient
      style={styles.background}
      colors={
        theme === "light"
          ? ["rgba(255,98,98,1)", "rgba(255,192,203,1)", "rgba(255,255,255,1)"]
          : ["rgba(179,0,0,1)", "rgba(102,0,0,1)", "rgba(0,0,0,1)"]
      }
      locations={[0, 0.2, 0.45]}
    />
  );
};

export default LinearGradientBackground;

const styles = StyleSheet.create({
  background: {
    ...(StyleSheet.absoluteFill as {}),
  },
});
