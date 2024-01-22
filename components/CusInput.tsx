import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Text as T } from "./Themed";
import Colors from "../constants/Colors";
import { CusInputProps } from "../types/component";

const CusInput: React.FC<CusInputProps> = (props) => {
  return (
    <View
      style={{
        width: props.title.length > 0 ? "49%" : "100%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {props.title.length > 0 && (
        <View
          style={{
            flex: props.title.length === 0 ? 0 : 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <T style={{ fontSize: 16, flexWrap: "wrap" }}>{props.title}</T>
          {props.title.length > 0 && (
            <T style={{ fontSize: 16, marginHorizontal: 4 }}>:</T>
          )}
        </View>
      )}
      <TextInput
        value={props.value}
        editable={!props.disable}
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
      {!!props.rate && (
        <Text
          style={{
            fontSize: 10,
            textAlign: "right",
            position: "absolute",
            right: 0,
            bottom: -12,
          }}
        >
          {props.rate}
        </Text>
      )}
    </View>
  );
};

export default CusInput;

const styles = StyleSheet.create({});
