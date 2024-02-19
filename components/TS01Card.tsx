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
import Tag from "./Tag";

const TS01Card: React.FC<TS01Data> = (props) => {
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
              ...props,
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
          flexDirection: "column",
          gap: 4,
        }}
      >
        <View style={styles.card_row_container}>
          <Text style={{ ...styles.card_commute_text, fontWeight: "bold" }}>
            FROM
          </Text>
          <Text
            style={{
              width: "100%",
              fontSize: 16,
              textAlign: "center",
              position: "absolute",
            }}
          >
            {props.departure_date}
          </Text>
          <Text
            style={{
              ...styles.card_commute_text,
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            To
          </Text>
        </View>

        <View style={styles.card_row_container}>
          <Text style={styles.card_commute_text}>{props.starting_place}</Text>
          <View
            style={{
              alignItems: "center",
              position: "absolute",
              width: "100%",
              justifyContent: "center",
            }}
          >
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
                width: 240,
                top: 12,
              }}
              lightColor={Colors["light"].tabIconDefault}
              darkColor={Colors["dark"].tabIconDefault}
            ></V>
          </View>
          <Text style={{ ...styles.card_commute_text, textAlign: "right" }}>
            {props.ending_place}
          </Text>
        </View>

        <View
          style={{ ...styles.card_row_container, justifyContent: "center" }}
        >
          {/* <Text
            style={{
              ...styles.card_commute_text,
              fontSize: 12,
            }}
          >
            {props.departure_time_text}
          </Text> */}
          <Text style={{ fontSize: 16 }}>{props.trip_designation}</Text>
          {/* <Text
            style={{
              ...styles.card_commute_text,
              textAlign: "right",
              fontSize: 12,
            }}
          >
            {props.achieve_time_text}
          </Text> */}
        </View>
      </View>

      {/* <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 4 }}>
        {props.duration}
      </Text> */}
      {
        // customer info
      }
      <View style={styles.info_gap}>
        <View style={styles.tag_wrap}>
          {props.dob.length > 0 && <Tag title="DOB: " value={props.dob} />}

          {props.luggage.length > 0 && (
            <Tag title="Luggage: " value={props.luggage} />
          )}
          {props.baby.length > 0 && <Tag title="Infant: " value={props.baby} />}
          {props.child.length > 0 && (
            <Tag title="Child: " value={props.child} />
          )}
        </View>
        <View style={styles.info_gap}>
          {(props.total_pax.length > 0 ||
            props.vip_cabin.length > 0 ||
            props.premier_grand.length > 0 ||
            props.super_class.length > 0 ||
            props.economy_class.length > 0) && (
            <T style={{ fontSize: 16, fontWeight: "bold" }}>
              No. of Pax./ Complimentary:
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
                <T style={styles.tag_text}>{props.total_pax}</T>
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
  card_row_container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
