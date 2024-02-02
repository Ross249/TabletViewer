import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constants/Colors";
import { Text as T } from "./Themed";
import { DatetimeSelectorProps } from "../types/component";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useUserInfo } from "../store/AuthStore";

const DatetimeSelector: React.FC<DatetimeSelectorProps> = (props) => {
  const [show, setShow] = useState(false);
  const userInfo = useUserInfo();
  useEffect(() => {
    setShow(false);
  }, [props.value]);

  return (
    <Pressable
      disabled={props.disable}
      style={{
        width: props.title.length > 0 ? "49%" : "100%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      onPress={() => setShow(true)}
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
            <T style={{ fontSize: 16, marginRight: 4 }}>:</T>
          )}
        </View>
      )}
      <View
        style={{
          flex: 1,
          position: "relative",
          borderRadius: 4,
          paddingHorizontal: 12,
          paddingVertical: 8,
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
