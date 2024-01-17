import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Text as T } from "./Themed";
import Colors from "../constants/Colors";
import { PreparedSelectorProps } from "../types/component";
import PreparedByModal from "./PreparedByModal";

const PreparedBySelector: React.FC<PreparedSelectorProps> = (props) => {
  const [show, setShow] = useState(false);

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
        <T>{!!props.value ? props.value.username : "Select Crew"}</T>
      </View>
      <View style={{ position: "absolute" }}>
        <PreparedByModal
          show={show}
          setShow={setShow}
          data={props.values}
          setData={props.onChange}
        />
      </View>
    </Pressable>
  );
};

export default PreparedBySelector;

const styles = StyleSheet.create({});
