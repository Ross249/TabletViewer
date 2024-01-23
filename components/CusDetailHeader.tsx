import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React from "react";
import { generalStyles } from "../constants/GeneralStyles";
import { TS02Header } from "../types/component";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Text as T } from "./Themed";
const CusDetailHeader: React.FC<TS02Header> = (props) => {
  const theme = useColorScheme();
  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          backgroundColor: Colors[theme ?? "light"].background,
          ...styles.header_inner,
        }}
      >
        <View style={{ gap: 8 }}>
          <T style={styles.title_label}>Route: </T>
          <View style={styles.press_c}>
            <T style={styles.font}>{props.start_place}</T>
            <FontAwesome
              name="exchange"
              size={24}
              color={Colors[theme ?? "light"].text}
              style={{ marginHorizontal: 8 }}
            />
            <T style={styles.font}>{props.end_place}</T>
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <T style={styles.title_label}>Departure Date: </T>
          <View style={styles.press_c}>
            <T style={styles.font}>{props.departure_date}</T>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CusDetailHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 4,
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  header_inner: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  font: {
    fontSize: 20,
    textAlign: "center",
  },
  press_c: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  title_label: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
