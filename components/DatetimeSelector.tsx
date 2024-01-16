import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constants/Colors";
import { Text as T } from "./Themed";
import { DatetimeSelectorProps } from "../types/component";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatetimeSelector: React.FC<DatetimeSelectorProps> = (props) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(false);
  }, [props.value]);

  return (
    <Pressable
      style={{
        width: "49%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      onPress={() => setShow(true)}
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
      <View
        style={{
          flex: 1,
          position: "relative",
          borderRadius: 4,
          paddingHorizontal: 8,
          paddingVertical: 2,
          backgroundColor: Colors["dark"].text_second,
          justifyContent: "center",
        }}
      >
        <T>
          {!!props.value && props.value.length > 0
            ? props.value
            : "Select Date/ Time"}
        </T>
      </View>
      <DateTimePickerModal
        isVisible={show}
        mode={props.type}
        locale="zh-HK"
        onConfirm={props.onChange}
        onCancel={() => setShow(false)}
      />
    </Pressable>
  );
};

export default DatetimeSelector;

const styles = StyleSheet.create({});
