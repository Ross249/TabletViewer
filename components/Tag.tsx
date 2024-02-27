import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React from "react";
import { Text as T } from "./Themed";
import Colors from "../constants/Colors";
import { TagProps } from "../types/component";

const Tag: React.FC<TagProps> = (props) => {
  const theme = useColorScheme();
  return (
    <View
      style={{
        ...styles.tag_container,
        backgroundColor: Colors[theme ?? "light"].tint,
      }}
    >
      <T style={styles.tag_text}>{props.title}</T>
      <T style={styles.tag_text}>{props.value}</T>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  tag_container: {
    flexDirection: "row",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    alignItems: "center",
  },
  tag_text: {
    fontSize: 20,
  },
});
