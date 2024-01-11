import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WebView from "react-native-webview";

const PrivacyPolicy = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ paddingHorizontal: 16 }}
        source={{
          uri: `${process.env.EXPO_PUBLIC_API_URL}/privacy-policy.html`,
        }}
      />
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
