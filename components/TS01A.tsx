import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useRef } from "react";
import {
  LocationData,
  TS01A,
  TS01AProps,
  VesselData,
} from "../types/component";
import { Text as T } from "./Themed";
import LocationSelector from "./LocationSelector";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import CusInput from "./CusInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatetimeSelector from "./DatetimeSelector";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { TsServices } from "../services/Ts.service";
import OneWaySelector from "./OneWaySelector";
import { useUserInfo } from "../store/AuthStore";

const TS01FormA: React.FC<TS01AProps> = (props) => {
  const theme = useColorScheme();
  const [locationModal, setLocationModal] = useState(false);
  const tag = useRef<"from" | "to">("from");
  const [vesselModal, setVesselModal] = useState(false);
  const userInfo = useUserInfo();

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <T style={{ fontSize: 24, fontWeight: "bold" }}>Route:</T>
          <Pressable
            disabled={userInfo.group_id > 1}
            style={{
              ...styles.press_container,
              backgroundColor: Colors[theme ?? "light"].text_second,
            }}
            onPress={() => {
              (tag.current = "from"), setLocationModal(true);
            }}
          >
            <T style={styles.font}>
              {props.from.id === 0 ? "From" : props.from.name_en}
            </T>
          </Pressable>

          <FontAwesome
            name="exchange"
            size={24}
            color={Colors[theme ?? "light"].text}
            style={{ marginHorizontal: 8 }}
          />
          <Pressable
            disabled={userInfo.group_id > 1}
            style={{
              ...styles.press_container,
              backgroundColor: Colors[theme ?? "light"].text_second,
            }}
            onPress={() => {
              (tag.current = "to"), setLocationModal(true);
            }}
          >
            <T style={styles.font}>
              {props.to.id === 0 ? "To" : props.to.name_en}
            </T>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap",
          gap: 10,
          marginTop: 16,
        }}
      >
        <DatetimeSelector
          disable={userInfo.group_id > 1}
          title="Departure Date"
          type="date"
          value={props.departure_date}
          onChange={(date) => {
            // @ts-ignore
            props.setData((prev: TS01A) => {
              return {
                ...(prev as TS01A),
                departure_date: moment(date).format("YYYY-MM-DD"),
              };
            });
          }}
        />

        <DatetimeSelector
          disable={userInfo.group_id > 1}
          title="Departure Time"
          type="time"
          value={props.departure_time}
          onChange={(date) => {
            // @ts-ignore
            props.setData((prev: TS01A) => {
              return {
                ...(prev as TS01A),
                departure_time: moment(date).format("HH:mm"),
              };
            });
          }}
        />

        <DatetimeSelector
          disable={userInfo.group_id > 1}
          title="Estimated Arrive Time"
          type="time"
          value={props.estimated_arrive_time}
          onChange={(date) => {
            // @ts-ignore
            props.setData((prev: TS01A) => {
              return {
                ...(prev as TS01A),
                estimated_arrive_time: moment(date).format("HH:mm"),
              };
            });
          }}
        />

        <CusInput
          disable={userInfo.group_id > 1}
          value={props.vessel_name}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01A) => {
              return {
                ...(prev as TS01A),
                vessel_name: text,
              };
            });
          }}
          title="Vessel Name"
        />
        <CusInput
          disable={userInfo.group_id > 1}
          value={props.tripe_designation}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01A) => {
              return {
                ...(prev as TS01A),
                tripe_designation: text,
              };
            });
          }}
          title="Trip Designation"
        />
        <CusInput
          disable={userInfo.group_id > 1}
          value={props.number_of_crew}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01A) => {
              return {
                ...(prev as TS01A),
                number_of_crew: text,
              };
            });
          }}
          title="No. of Crew"
        />
        <CusInput
          disable={userInfo.group_id > 1}
          value={props.number_of_crew_for_relieving}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01A) => {
              return {
                ...(prev as TS01A),
                number_of_crew_for_relieving: text,
              };
            });
          }}
          title="No. of Crew for Relieving/ Training"
        />
        <CusInput
          disable={userInfo.group_id > 1}
          value={props.total_number_of_crew}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01A) => {
              return {
                ...(prev as TS01A),
                total_number_of_crew: text,
              };
            });
          }}
          title="Total No. of Crew"
        />
        <CusInput
          disable={userInfo.group_id > 1}
          value={props.number_of_group_pax}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01A) => {
              return {
                ...(prev as TS01A),
                number_of_group_pax: text,
              };
            });
          }}
          title="No. of Group Pax"
        />
      </View>
      <LocationSelector
        show={locationModal}
        setShow={setLocationModal}
        tag={tag.current}
        route={{
          from: props.from,
          to: props.to,
        }}
        setRoute={props.setRoute}
      />
    </View>
  );
};

export default TS01FormA;

const styles = StyleSheet.create({
  font: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  press_container: {
    paddingHorizontal: 16,
    borderRadius: 4,
    paddingVertical: 4,
  },
});
