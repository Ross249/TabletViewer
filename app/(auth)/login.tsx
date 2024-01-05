import { Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, View } from "../../components/Themed";
import { Link } from "expo-router";
import { useAuthActions, useAuthStore } from "../../store/AuthStore";

const login = () => {
  const setToken = useAuthActions().setToken;

  return (
    <View>
      <Text>login</Text>
      <Pressable onPress={() => setToken("token")}>
        <Text>login adadsad</Text>
      </Pressable>

      <Link href={"/"}>
        <Text>to /</Text>
      </Link>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({});
