import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";

const RootLayoutNav = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(drawers)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ title: "Privacy Policy" }} />
      </Stack>
    </ThemeProvider>
  );
};

export default RootLayoutNav;

const styles = StyleSheet.create({});
