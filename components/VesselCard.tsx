import { StyleSheet, Text, View, useColorScheme, Image } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { VesselData } from "../types/component";
import { Text as T } from "./Themed";
import Colors from "../constants/Colors";
import Tag from "./Tag";

const VesselCard: React.FC<VesselData> = (props) => {
  const theme = useColorScheme();
  return (
    <BlurView
      intensity={100}
      tint={theme === "light" ? "light" : "dark"}
      key={props.id}
      style={styles.card_container}
    >
      <View style={styles.card_header_container}>
        <Text style={styles.card_header_title}>{props.name}</Text>
      </View>
      <View
        style={{
          ...styles.card_header_container,
          width: "100%",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <View style={styles.card_row_container}>
          <Image
            source={{ uri: props.format_image }}
            style={{
              width: "100%",
              height: 300,
              resizeMode: "cover",
              borderRadius: 4,
            }}
          />
        </View>
      </View>
      <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 4 }}>
        {props.number}
      </Text>
      <View style={styles.info_gap}>
        <View style={styles.tag_wrap}>
          {!!props.total_pax && <Tag title="Total: " value={props.total_pax} />}
          {!!props.crew && <Tag title="Crew: " value={props.crew} />}
          {!!props.economy_class && (
            <Tag title="Economy Class: " value={props.economy_class} />
          )}
          {!!props.premier_grand && (
            <Tag title="Premier Grand: " value={props.premier_grand} />
          )}
          {!!props.super_class && (
            <Tag title="Super Class: " value={props.super_class} />
          )}
          {!!props.vip_cabin && (
            <Tag title="VIP Cabin: " value={props.vip_cabin} />
          )}
        </View>
      </View>
    </BlurView>
  );
};

export default VesselCard;

const styles = StyleSheet.create({
  card_container: {
    width: "100%",
    gap: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "transparent",
    paddingHorizontal: 16,
    paddingVertical: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  card_header_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card_header_title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    width: "100%",
  },
  card_row_container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 4,
  },
  info_gap: {
    gap: 8,
  },
  tag_wrap: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    gap: 8,
  },
  tag_container: {
    flexDirection: "row",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    alignItems: "center",
  },
  tag_text: {
    fontSize: 12,
  },
});
