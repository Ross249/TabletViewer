import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Image,
} from "react-native";
import React from "react";
import { TS01Data } from "../types/response";
import Colors from "../constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { View as V, Text as T } from "./Themed";
import { Link } from "expo-router";

const TS01Card = (props: TS01Data) => {
  const theme = useColorScheme();
  return (
    <BlurView
      intensity={100}
      tint={theme === "light" ? "light" : "dark"}
      key={props.id}
      style={styles.card_container}
    >
      {
        // card header
      }
      <View style={styles.card_header_container}>
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: "20%", resizeMode: "contain" }}
        />
        <Text style={styles.card_header_title}>Scheduled TS-01</Text>
        <Link
          href={{
            pathname: "/create01",
            params: {
              tag: "edit",
            },
          }}
        >
          <MaterialCommunityIcons
            name="file-edit-outline"
            size={20}
            color="black"
          />
        </Link>
      </View>
      {
        // sailing info
      }

      <View
        style={{
          ...styles.card_header_container,
          width: "100%",
        }}
      >
        <View style={{ gap: 4 }}>
          <Text style={{ ...styles.card_commute_text, fontWeight: "bold" }}>
            FROM
          </Text>
          <Text style={styles.card_commute_text}>{props.starting_place}</Text>
          <Text style={{ ...styles.card_commute_text, fontSize: 12 }}>
            {props.departure_time_text}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            flex: 1,
            gap: 4,
          }}
        >
          <Text style={{ fontSize: 16, textAlign: "center" }}>
            {props.departure_date}
          </Text>
          <View style={{ alignItems: "center" }}>
            <Ionicons
              name="boat-outline"
              size={28}
              color={Colors[theme ?? "light"].tint}
              style={{ zIndex: 100 }}
            />
            <V
              style={{
                position: "absolute",
                height: 2,
                width: "60%",
                top: 12,
              }}
              lightColor={Colors["light"].tabIconDefault}
              darkColor={Colors["dark"].tabIconDefault}
            ></V>
          </View>
          <Text style={{ fontSize: 16 }}>{props.trip_designation}</Text>
        </View>
        <View style={{ gap: 4 }}>
          <Text
            style={{
              ...styles.card_commute_text,
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            To
          </Text>
          <Text style={{ ...styles.card_commute_text, textAlign: "right" }}>
            {props.ending_place}
          </Text>
          <Text
            style={{
              ...styles.card_commute_text,
              textAlign: "right",
              fontSize: 12,
            }}
          >
            {props.achieve_time_text}
          </Text>
        </View>
      </View>
      <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 4 }}>
        {props.duration}
      </Text>
      {
        // customer info
      }
      <View style={styles.info_gap}>
        <View style={styles.tag_wrap}>
          {props.dob.length > 0 && (
            <View
              style={{
                ...styles.tag_container,
                backgroundColor: Colors[theme ?? "light"].tint,
              }}
            >
              <T style={styles.tag_text}>DOB: </T>
              <T style={styles.tag_text}>{props.dob}</T>
            </View>
          )}

          {props.luggage.length > 0 && (
            <View
              style={{
                ...styles.tag_container,
                backgroundColor: Colors[theme ?? "light"].tint,
              }}
            >
              <T style={styles.tag_text}>Luggage: </T>
              <T style={styles.tag_text}>{props.luggage}</T>
            </View>
          )}
          {props.baby.length > 0 && (
            <View
              style={{
                ...styles.tag_container,
                backgroundColor: Colors[theme ?? "light"].tint,
              }}
            >
              <T style={styles.tag_text}>Infant: </T>
              <T style={styles.tag_text}>{props.baby}</T>
            </View>
          )}
          {props.child.length > 0 && (
            <View
              style={{
                ...styles.tag_container,
                backgroundColor: Colors[theme ?? "light"].tint,
              }}
            >
              <T style={styles.tag_text}>Child: </T>
              <T style={styles.tag_text}>{props.child}</T>
            </View>
          )}
        </View>
        <View style={styles.info_gap}>
          {(props.total_pax.length > 0 ||
            props.vip_cabin.length > 0 ||
            props.premier_grand.length > 0 ||
            props.super_class.length > 0 ||
            props.economy_class.length > 0) && (
            <T style={{ fontSize: 16, fontWeight: "bold" }}>
              No. of Pax./ Complimentary/ Loading Rate:
            </T>
          )}
          <View style={styles.tag_wrap}>
            {props.total_pax.length > 0 && (
              <View
                style={{
                  ...styles.tag_container,
                  backgroundColor: Colors[theme ?? "light"].tint,
                }}
              >
                <T style={styles.tag_text}>Total: </T>
                <T style={styles.tag_text}>
                  {props.total_pax}
                  {!!props.total_pax_attendance &&
                  props.total_pax_attendance.length > 0
                    ? "/ " + props.total_pax_attendance
                    : ""}
                </T>
              </View>
            )}
            {props.vip_cabin.length > 0 && (
              <View
                style={{
                  ...styles.tag_container,
                  backgroundColor: Colors[theme ?? "light"].tint,
                }}
              >
                <T style={styles.tag_text}>VIP: </T>
                <T style={styles.tag_text}>
                  {props.vip_cabin}
                  {props.vip_cabin_complimentary.length > 0
                    ? "/ " + props.vip_cabin_complimentary
                    : ""}
                  {!!props.vip_cabin_attendance &&
                  props.vip_cabin_attendance.length > 0
                    ? "/ " + props.vip_cabin_attendance
                    : ""}
                </T>
              </View>
            )}

            {props.premier_grand.length > 0 && (
              <View
                style={{
                  ...styles.tag_container,
                  backgroundColor: Colors[theme ?? "light"].tint,
                }}
              >
                <T style={styles.tag_text}>Premier: </T>
                <T style={styles.tag_text}>
                  {props.premier_grand}
                  {props.premier_grand_complimentary.length > 0
                    ? "/ " + props.premier_grand_complimentary
                    : ""}
                  {!!props.premier_grand_attendance &&
                  props.premier_grand_attendance.length > 0
                    ? "/ " + props.premier_grand_attendance
                    : ""}
                </T>
              </View>
            )}
            {props.super_class.length > 0 && (
              <View
                style={{
                  ...styles.tag_container,
                  backgroundColor: Colors[theme ?? "light"].tint,
                }}
              >
                <T style={styles.tag_text}>Super: </T>
                <T style={styles.tag_text}>
                  {props.super_class}
                  {props.super_class_complimentary.length > 0
                    ? "/ " + props.super_class_complimentary
                    : ""}
                  {!!props.super_class_attendance &&
                  props.super_class_attendance.length > 0
                    ? "/ " + props.super_class_attendance
                    : ""}
                </T>
              </View>
            )}
            {props.economy_class.length > 0 && (
              <View
                style={{
                  ...styles.tag_container,
                  backgroundColor: Colors[theme ?? "light"].tint,
                }}
              >
                <T style={styles.tag_text}>Economy: </T>
                <T style={styles.tag_text}>
                  {props.economy_class}{" "}
                  {props.economy_class_complimentary.length > 0
                    ? "/ " + props.economy_class_complimentary
                    : ""}
                  {!!props.economy_class_attendance &&
                  props.economy_class_attendance.length > 0
                    ? "/ " + props.economy_class_attendance
                    : ""}
                </T>
              </View>
            )}
          </View>
        </View>
      </View>
    </BlurView>
  );
};

export default React.memo(TS01Card);

const styles = StyleSheet.create({
  card_container: {
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
    position: "absolute",
    textAlign: "center",
    width: "100%",
  },
  card_commute_text: {
    fontSize: 20,
  },
  info_gap: {
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
  tag_wrap: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    gap: 8,
  },
});
