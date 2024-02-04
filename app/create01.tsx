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
import { generalStyles } from "../constants/GeneralStyles";
const create01 = () => {
  const params = useLocalSearchParams();
  const theme = useColorScheme();
  const navigation = useNavigation();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formCaptin, setFormCaptin] = useState<TS01A>({
    departure_date:
      params.tag === "edit" ? (params.departure_date as string) : "",
    departure_time:
      params.tag === "edit" ? (params.departure_time as string) : "",
    vessel_name: params.tag === "edit" ? (params.boat_name as string) : "",
    tripe_designation:
      params.tag === "edit" ? (params.trip_designation as string) : "",
    number_of_crew: params.tag === "edit" ? (params.crew as string) : "",
    number_of_crew_for_relieving:
      params.tag === "edit" ? (params.crew_for_relieving as string) : "",
    total_number_of_crew:
      params.tag === "edit" ? (params.total_crew as string) : "",
    number_of_group_pax:
      params.tag === "edit" ? (params.group_pax as string) : "",
    estimated_arrive_time:
      params.tag === "edit" ? (params.estimated_achieve_time as string) : "",
  });
  const [formStaff, setFormStaff] = useState<TS01B>({
    vip_cabin: params.tag === "edit" ? (params.vip_cabin as string) : "",
    vip_cabin_complimentary:
      params.tag === "edit" ? (params.vip_cabin_complimentary as string) : "",
    vip_cabin_rate: "",
    premier_grand:
      params.tag === "edit" ? (params.premier_grand as string) : "",
    premier_grand_complimentary:
      params.tag === "edit"
        ? (params.premier_grand_complimentary as string)
        : "",
    premier_grand_rate: "",
    super_class: params.tag === "edit" ? (params.super_class as string) : "",
    super_class_complimentary:
      params.tag === "edit" ? (params.super_class_complimentary as string) : "",
    super_class_rate: "",
    economy_class:
      params.tag === "edit" ? (params.economy_class as string) : "",
    economy_class_complimentary:
      params.tag === "edit"
        ? (params.economy_class_complimentary as string)
        : "",
    economy_class_rate: "",
    total_pax: params.tag === "edit" ? (params.total_pax as string) : "",
    infant: params.tag === "edit" ? (params.baby as string) : "",
    child: params.tag === "edit" ? (params.child as string) : "",
    dob: params.tag === "edit" ? (params.dob as string) : "",
    luggage: params.tag === "edit" ? (params.luggage as string) : "",
    prepared_by: {
      id: params.tag === "edit" ? (params.prepared_by_id as any) : 0,
      group_id: 0,
      group_name: "",
      username: params.tag === "edit" ? (params.prepared_by as string) : "",
      url: "",
    },

    submitted_at:
      params.tag === "edit" ? (params.generate_time_text as string) : "",
    arrived_at:
      params.tag === "edit" ? (params.achieve_time_text as string) : "",
    delay_departure_code:
      params.tag === "edit" ? (params.delay_departure_code as string) : "",
    remarks: params.tag === "edit" ? (params.remark as string) : "",
  });
  const [route, setRoute] = useState<RouteData>({
    from: {
      id: params.tag === "edit" ? parseInt(params.starting_place_id as any) : 0,
      name: params.tag === "edit" ? (params.starting_place as string) : "",
      name_en: params.tag === "edit" ? (params.starting_place as string) : "",
    },
    to: {
      id: params.tag === "edit" ? parseInt(params.ending_place_id as any) : 0,
      name: params.tag === "edit" ? (params.ending_place as string) : "",
      name_en: params.tag === "edit" ? (params.ending_place as string) : "",
    },
  });

  const createTS01 = useMutation({
    mutationKey: ["generate_01"],
    mutationFn: TsServices.createTS01,
  });
  const updateTS01 = useMutation({
    mutationKey: ["update_01"],
    mutationFn: TsServices.updateTS01,
  });

  const create_and_submite = async (tag: string) => {
    setLoading(true);
    switch (tag) {
      case "create":
        return await createTS01.mutateAsync(
          {
            starting_place_id: route.from.id.toString(),
            starting_place: route.from.name_en,
            ending_place_id: route.to.id.toString(),
            ending_place: route.to.name_en,
            boat_name: formCaptin.vessel_name,
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
            remark: formStaff.remarks,
            delay_departure_code: formStaff.delay_departure_code,
          },
          {
            onError: (e) => {
              setLoading(false);
              toast.show(e.message, {
                type: "danger",
              });
            },
            onSuccess: () => {
              setLoading(false);
              toast.show("Create Successful", {
                type: "success",
              });
              navigation.goBack();
            },
          }
        );
      case "edit":
        return await updateTS01.mutateAsync(
          {
            id: params.id.toString(),
            starting_place_id: route.from.id.toString(),
            starting_place: route.from.name_en,
            ending_place_id: route.to.id.toString(),
            ending_place: route.to.name_en,
            boat_name: formCaptin.vessel_name,
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
            remark: formStaff.remarks,
            delay_departure_code: formStaff.delay_departure_code,
          },
          {
            onError: (e) => {
              setLoading(false);
              toast.show(e.message, {
                type: "danger",
              });
            },
            onSuccess: () => {
              setLoading(false);
              toast.show("Submit Successful", {
                type: "success",
              });
              navigation.goBack();
            },
          }
        );
      default:
        setLoading(false);
        break;
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log(`starting_place_id: ${params.starting_place_id}`); // params.starting_place_id);

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

  return (
    <ScrollView>
      <ScrollView
        scrollEnabled={true}
        style={styles.container}
        contentContainerStyle={styles.scroll_container}
      >
        <TS01FormA
          {...formCaptin}
          {...route}
          setData={setFormCaptin}
          setRoute={setRoute}
        />
        <TS01FormB {...formStaff} setData={setFormStaff} />
      </ScrollView>
      {!loading ? (
        <View
          style={{
            width: "100%",
            paddingHorizontal: generalStyles.paddingHorizontal,
          }}
        >
          <Pressable
            style={{
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
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
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
