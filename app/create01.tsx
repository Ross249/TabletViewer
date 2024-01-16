import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { RouteData, TS01A, TS01B, VesselData } from "../types/component";
import TS01FormA from "../components/TS01A";
const create01 = () => {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const [formCaptin, setFormCaptin] = useState<TS01A>({
    departure_date: "",
    departure_time: "",
    vessel_name: "",
    tripe_designation: "",
    number_of_crew: "",
    number_of_crew_for_relieving: "",
    total_number_of_crew: "",
    number_of_group_pax: "",
    estimated_arrive_time: "",
  });
  const [formStaff, setFormStaff] = useState<TS01B>({
    vip_cabin: "",
    vip_cabin_complimentary: "",
    vip_cabin_rate: "",
    premier_grand: "",
    premier_grand_complimentary: "",
    premier_grand_rate: "",
    super_class: "",
    super_class_complimentary: "",
    super_class_rate: "",
    economy_class: "",
    economy_class_complimentary: "",
    economy_class_rate: "",
    total_pax: "",
    infant: "",
    child: "",
    dob: "",
    luggage: "",
    prepared_by: [],

    submitted_at: "",
    arrived_at: "",
  });
  const [selectedVessel, setSelectedVessel] = useState<VesselData>({
    id: 0, //船只ID
    name: "", //船只名称
    image: "",
    number: "", //船隻編號
    crew: "", //船員人數
    total_pax: "", //总乘客量
    economy_class: "", //普通位
    super_class: "", //豪華位
    premier_grand: "", //尊豪位
    vip_cabin: "", //貴賓廂
    createtime: 0,
    updatetime: 0,
    format_image: "",
  });
  const [route, setRoute] = useState<RouteData>({
    from: {
      id: 0,
      name: "",
      name_en: "",
    },
    to: {
      id: 0,
      name: "",
      name_en: "",
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: params.tag === "create" ? "Create" : "Edit",
    });
  }, []);

  useEffect(() => {
    console.log(formCaptin);
  }, [formCaptin]);
  useEffect(() => {
    console.log(route);
  }, [route]);
  useEffect(() => {
    setFormCaptin({ ...formCaptin, vessel_name: selectedVessel.name });
  }, [selectedVessel]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scroll_container}
    >
      <TS01FormA
        {...formCaptin}
        {...route}
        vessel={selectedVessel}
        setVessel={setSelectedVessel}
        setData={setFormCaptin}
        setRoute={setRoute}
      />
      <Text>{params.tag}</Text>
    </ScrollView>
  );
};

export default create01;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  scroll_container: {
    flex: 1,
    flexWrap: "wrap",
    paddingHorizontal: "4%",
    paddingVertical: "2%",
  },
});
