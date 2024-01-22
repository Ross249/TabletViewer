import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FilterFormData, FilterFormProps, RouteData } from "../types/component";
import { generalStyles } from "../constants/GeneralStyles";
import Colors from "../constants/Colors";
import { Text as T } from "./Themed";
import LocationSelector from "./LocationSelector";
import { FontAwesome } from "@expo/vector-icons";
import CusInput from "./CusInput";
import DatetimeSelector from "./DatetimeSelector";
import moment from "moment";

const FilterFormHeader: React.FC<FilterFormProps> = (props) => {
  const theme = useColorScheme();
  const [route, setRoute] = useState<RouteData>({
    from: props.from,
    to: props.to,
  });
  const [data, setData] = useState<Omit<FilterFormData, "from" | "to">>({
    departure_date: props.departure_date,
    trip_designation: props.trip_designation,
  });
  const [locationModal, setLocationModal] = useState(false);
  const tag = useRef<"from" | "to">("from");

  useEffect(() => {
    console.log(`${data.departure_date}`);
  }, [data]);

  const press_for_search = () => {
    props.setData({
      from: route.from,
      to: route.to,
      trip_designation: "",
      departure_date: data.departure_date,
    });
    setData({
      departure_date: "",
      trip_designation: "",
    });
  };

  return (
    <View
      style={{
        ...styles.header_container,
      }}
    >
      <View
        style={{
          ...styles.header_inner,
          backgroundColor: Colors[theme ?? "light"].background,
        }}
      >
        <View style={{ gap: 8, width: "48%" }}>
          <T style={styles.title_label}>Route: </T>
          <View style={styles.press_c}>
            <Pressable
              disabled={false}
              style={{
                ...styles.press_container,
                backgroundColor: Colors[theme ?? "light"].text_second,
              }}
              onPress={() => {
                (tag.current = "from"), setLocationModal(true);
              }}
            >
              <T style={styles.font}>
                {route.from.id === 0 ? "From" : route.from.name_en}
              </T>
            </Pressable>

            <FontAwesome
              name="exchange"
              size={24}
              color={Colors[theme ?? "light"].text}
              style={{ marginHorizontal: 8 }}
            />
            <Pressable
              disabled={false}
              style={{
                ...styles.press_container,
                backgroundColor: Colors[theme ?? "light"].text_second,
              }}
              onPress={() => {
                (tag.current = "to"), setLocationModal(true);
              }}
            >
              <T style={styles.font}>
                {route.to.id === 0 ? "To" : route.to.name_en}
              </T>
            </Pressable>
          </View>
        </View>

        <View style={{ gap: 8, width: "48%" }}>
          <T style={styles.title_label}>Departure Date: </T>
          <DatetimeSelector
            disable={false}
            title=""
            type="date"
            value={data.departure_date}
            onChange={(date) => {
              // @ts-ignore
              setData((prev: Omit<FilterFormData, "from" | "to">) => {
                return {
                  ...(prev as Omit<FilterFormData, "from" | "to">),
                  departure_date: moment(date).format("YYYY-MM-DD"),
                };
              });
            }}
          />
        </View>

        {/* <View style={{ gap: 8, width: "100%" }}>
          <T style={styles.title_label}>Trip Designation: </T>
          <CusInput
            disable={false}
            value={data.trip_designation}
            onChange={(text) => {
              // @ts-ignore
              setData((prev: Omit<FilterFormData, "from" | "to">) => {
                return {
                  ...(prev as Omit<FilterFormData, "from" | "to">),
                  trip_designation: text,
                };
              });
            }}
            title=""
          />
        </View> */}

        <View style={{ gap: 8, width: "100%" }}>
          <Pressable
            style={{
              ...styles.search_btn,
              backgroundColor: Colors[theme ?? "light"].tint,
            }}
            onPress={press_for_search}
          >
            <T style={styles.search_btn_text}>Search</T>
          </Pressable>
        </View>
      </View>
      <View style={{ position: "absolute" }}>
        <LocationSelector
          show={locationModal}
          setShow={setLocationModal}
          tag={tag.current}
          route={{
            from: route.from,
            to: route.to,
          }}
          setRoute={setRoute}
        />
      </View>
    </View>
  );
};

export default FilterFormHeader;

const styles = StyleSheet.create({
  header_container: {
    padding: 4,
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
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
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
  press_c: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  title_label: {
    fontSize: 24,
    fontWeight: "bold",
  },
  search_btn: {
    paddingVertical: 8,
    borderRadius: 4,
  },
  search_btn_text: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
});
