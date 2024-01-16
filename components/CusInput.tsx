import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Text as T } from "./Themed";
import Colors from "../constants/Colors";
import { CusInputProps } from "../types/component";

const CusInput: React.FC<CusInputProps> = (props) => {
  return (
    <View
      style={{
        width: "49%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <T style={{ fontSize: 16, flexWrap: "wrap" }}>{props.title}</T>
        <T style={{ fontSize: 16, marginRight: 4 }}>:</T>
      </View>
      <TextInput
        value={props.value}
        onChangeText={props.onChange}
        style={{
          flex: 1,
          position: "relative",
          borderRadius: 4,
          paddingHorizontal: 8,
          paddingVertical: 2,
          backgroundColor: Colors["dark"].text_second,
        }}
      />
    </View>
  );
};

export default CusInput;

const styles = StyleSheet.create({});
