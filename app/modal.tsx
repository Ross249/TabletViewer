import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { WebViewModalProps } from "../types/component";
import { WebView } from "react-native-webview";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";

const modal = () => {
  const params = useLocalSearchParams<WebViewModalProps>();
  console.log(params);

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: params.url }} />
    </View>
  );
};

export default modal;

const styles = StyleSheet.create({});
