import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { RouteData, TS01A, TS01B, VesselData } from "../types/component";
import TS01FormA from "../components/TS01A";
import TS01FormB from "../components/TS01B";
import { useMutation } from "@tanstack/react-query";
import { TsServices } from "../services/Ts.service";
import Colors from "../constants/Colors";
import { useToast } from "react-native-toast-notifications";
const create01 = () => {
  const params = useLocalSearchParams();
  const theme = useColorScheme();
  const navigation = useNavigation();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
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
    prepared_by: {
      id: 0,
      group_id: 0,
      group_name: "",
      username: "",
      url: "",
    },

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

  const createTS01 = useMutation({
    mutationKey: ["generate_01"],
    mutationFn: TsServices.createTS01,
  });

  const create_and_submite = async (tag: string) => {
    switch (tag) {
      case "create":
        return await createTS01.mutateAsync(
          {
            starting_place: route.from.name,
            ending_place: route.to.name,
            boat_id: selectedVessel.id.toString(),
            departure_date: formCaptin.departure_date,
            departure_time: formCaptin.departure_time,
            estimated_achieve_time: formCaptin.estimated_arrive_time,
            trip_designation: formCaptin.tripe_designation,
            crew: formCaptin.number_of_crew,
            vip_cabin: formStaff.vip_cabin,
            premier_grand: formStaff.premier_grand,
            super_class: formStaff.super_class,
            economy_class: formStaff.economy_class,
            total_pax: formStaff.total_pax,
            vip_cabin_complimentary: formStaff.vip_cabin_complimentary,
            premier_grand_complimentary: formStaff.premier_grand_complimentary,
            super_class_complimentary: formStaff.super_class_complimentary,
            economy_class_complimentary: formStaff.economy_class_complimentary,
            crew_for_relieving: formCaptin.number_of_crew_for_relieving,
            group_pax: formCaptin.number_of_group_pax,
            baby: formStaff.infant,
            child: formStaff.child,
            dob: formStaff.dob,
            luggage: formStaff.luggage,
            prepared_by_id: formStaff.prepared_by.id.toString(),
            generate_time: formStaff.submitted_at,
            achieve_time: formStaff.arrived_at,
          },
          {
            onError: (e) => {
              toast.show(e.message, {
                type: "danger",
              });
            },
            onSuccess: () => {
              toast.show("Create Success", {
                type: "success",
              });
              navigation.goBack();
            },
          }
        );
      case "edit":
      default:
        break;
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: params.tag === "create" ? "Create" : "Edit",
    });
  }, []);

  useEffect(() => {
    console.log(formStaff);
  }, [formStaff]);
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
      <TS01FormB {...formStaff} setData={setFormStaff} />

      {!loading ? (
        <Pressable
          style={{
            width: "100%",
            paddingVertical: 8,
            marginVertical: 16,
            borderRadius: 8,
            backgroundColor: Colors[theme ?? "light"].tint,
          }}
          onPress={() => create_and_submite(params.tag as string)}
        >
          <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>
            {params.tag === "create" ? "Create" : "Submit"}
          </Text>
        </Pressable>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator
            size="large"
            color={Colors[theme ?? "light"].tint}
          />
        </View>
      )}
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
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: "4%",
    paddingVertical: "2%",
    gap: 8,
  },
});
