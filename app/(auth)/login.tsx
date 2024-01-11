import {
  Pressable,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View, useThemeColor } from "../../components/Themed";
import { Link, useNavigation } from "expo-router";
import { useAuthStore } from "../../store/AuthStore";
import Colors from "../../constants/Colors";
import { useToast } from "react-native-toast-notifications";
import { useMutation } from "@tanstack/react-query";
import { AuthServices } from "../../services/Auth.service";
import { LoginResponseData } from "../../types/response";
import { Feather } from "@expo/vector-icons";

const width = Dimensions.get("screen").width;
const login = () => {
  const setToken = useAuthStore().setToken;
  const [loading, setLoading] = useState(false);
  const setUserInfo = useAuthStore().setUserInfo;
  const toast = useToast();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: AuthServices.login,
  });

  const press_for_login = async () => {
    if (loginForm.email.length > 0 && loginForm.password.length > 0) {
      setLoading(true);
      await login.mutateAsync(
        {
          account: loginForm.email.trim(),
          password: loginForm.password.trim(),
        },
        {
          onSuccess: (data: LoginResponseData) => {
            setToken(data.token);
            setUserInfo(data.userinfo);

            setLoading(false);
            toast.show("Login Success", {
              type: "success",
            });
          },
          onError: (e) => {
            setLoading(false);
            toast.show(e.message, {
              type: "danger",
            });
          },
        }
      );
    } else {
      toast.show("Please check your email and password", {
        type: "danger",
      });
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <Image
        source={require("../../assets/images/logo.png")}
        style={{
          maxWidth: width * 0.8,
          resizeMode: "contain",
          marginTop: "15%",
        }}
      />

      <View style={styles.form_container}>
        <TextInput
          style={styles.input}
          value={loginForm.email}
          onChangeText={(text) => setLoginForm({ ...loginForm, email: text })}
          placeholder="Email or Account..."
          cursorColor={Colors[colorScheme ?? "light"].tint}
        />
        <TextInput
          style={styles.input}
          value={loginForm.password}
          onChangeText={(text) =>
            setLoginForm({ ...loginForm, password: text })
          }
          placeholder="Password..."
          secureTextEntry={true}
          cursorColor={Colors[colorScheme ?? "light"].tint}
        />
        <View style={{ flexDirection: "row-reverse" }}>
          <Pressable
            onPress={() => {
              toast.show("Please contact admin for reset password", {
                type: "warning",
                placement: "bottom",
                duration: 3000,
              });
            }}
          >
            <Text
              style={{
                color: Colors[colorScheme ?? "light"].text_second,
                fontSize: 12,
              }}
            >
              Forgot Password?
            </Text>
          </Pressable>
        </View>

        {loading ? (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator
              color={Colors[colorScheme ?? "light"].tint}
              size={"large"}
            />
          </View>
        ) : (
          <Pressable
            style={{
              ...styles.button,
              backgroundColor: Colors[colorScheme ?? "light"].tint,
            }}
            onPress={press_for_login}
          >
            <Text style={styles.button_text}>Login</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  form_container: {
    marginTop: 32,
    display: "flex",
    gap: 12,
    width: "100%",
    paddingHorizontal: "20%",
  },
  input: {
    borderRadius: 50,
    borderColor: Colors.light.tabIconDefault,
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 50,
  },
  button_text: {
    fontSize: 16,
    color: "white",
  },
  checkbox: {
    width: 15,
    height: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  policy_text: {
    fontSize: 12,
  },
});
