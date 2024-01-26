import {
  StyleSheet,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  RefreshControl,
  useColorScheme,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Text, View } from "../../../components/Themed";
import { FilterFormData } from "../../../types/component";
import LinearGradientBackground from "../../../components/LinearGradientBackground";
import FilterFormHeader from "../../../components/FilterFormHeader";
import CusHeader from "../../../components/CusHeader";
import { generalStyles } from "../../../constants/GeneralStyles";
import { useToken } from "../../../store/AuthStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { TsServices } from "../../../services/Ts.service";
import Colors from "../../../constants/Colors";
import { TS02ListData } from "../../../types/response";
import { Link, useNavigation } from "expo-router";
const form = () => {
  const theme = useColorScheme();
  const token = useToken();
  const [filterForm, setFilterForm] = useState<FilterFormData>({
    departure_date: "",
    trip_designation: "",
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
  const get_or_search_ts02 = useInfiniteQuery<TS02ListData>({
    queryKey: [
      "get_or_search",
      filterForm.departure_date,
      filterForm.trip_designation,
      filterForm.from.id,
      filterForm.to.id,
    ],
    queryFn: ({ pageParam }) =>
      TsServices.getOrSearchTS02({
        page: pageParam as number,
        starting_place: filterForm.from.name_en,
        ending_place: filterForm.to.name_en,
        trip_designation: filterForm.trip_designation,
        departure_date: filterForm.departure_date,
      }),
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      console.log(
        `lastPage: ${lastPage?.current_page} allPages: ${allPages?.length} lastPageParam: ${lastPageParam} allPageParams: ${allPageParams.length}`
      );

      if (!token) {
        return false;
      } else {
        return lastPage.current_page + 1 > lastPage.total
          ? false
          : lastPage.current_page + 1;
      }
    },
    refetchOnWindowFocus: true,
    initialPageParam: 1,
    enabled: !!token,
  });

  const _onMomentumScrollEnd = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const isCloseToBottom =
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >
      nativeEvent.contentSize.height - 30;
    if (isCloseToBottom) {
      if (get_or_search_ts02.hasNextPage) get_or_search_ts02.fetchNextPage();
    }
  };

  const refresh = () => {
    get_or_search_ts02.refetch();
  };

  return (
    <View style={styles.container}>
      <LinearGradientBackground />
      <CusHeader title="TS-02"></CusHeader>
      <ScrollView
        style={styles.scrol}
        onMomentumScrollEnd={_onMomentumScrollEnd}
        refreshControl={
          <RefreshControl
            refreshing={get_or_search_ts02.isFetching}
            onRefresh={refresh}
          />
        }
        contentContainerStyle={{ paddingVertical: 16, gap: 16 }}
      >
        <FilterFormHeader {...filterForm} setData={setFilterForm} />
        <ScrollView
          horizontal
          style={{
            borderRadius: 4,
            borderColor: "rgba(0,0,0,0.1)",
            backgroundColor: Colors[theme ?? "light"].background,
            borderWidth: 1,
          }}
          contentContainerStyle={{
            width: 14 * 60,
            flexWrap: "wrap",
            padding: 8,
          }}
        >
          <View style={styles.table_head}>
            <Text style={styles.table_head_text}>Date</Text>
            <Text style={styles.table_head_text}>Starting Place</Text>
            <Text style={styles.table_head_text}>Ending Place</Text>
            <Text style={styles.table_head_text}>Total Flight</Text>
            <Text style={styles.table_head_text}>E</Text>
            <Text style={styles.table_head_text}>SC</Text>
            <Text style={styles.table_head_text}>PG</Text>
            <Text style={styles.table_head_text}>VIP</Text>
            <Text style={styles.table_head_text}>Total PAX</Text>
            <Text style={styles.table_head_text}>Crew</Text>
            <Text style={styles.table_head_text}>Generated Time</Text>
            <Text style={styles.table_head_text}>Operate</Text>
          </View>
          {get_or_search_ts02.isSuccess &&
            get_or_search_ts02.data.pages.map((_item, i) =>
              _item.data.map((value, i) => (
                <View
                  style={{
                    ...styles.table_head,
                    borderTopColor: "rgba(0,0,0,0.2)",
                    borderTopWidth: 1,
                  }}
                  key={value.id}
                >
                  <Text style={styles.table_text}>{value.date}</Text>
                  <Text style={styles.table_text}>{value.starting_place}</Text>
                  <Text style={styles.table_text}>{value.ending_place}</Text>
                  <Text style={styles.table_text}>
                    {value.number_of_flights}
                  </Text>
                  <Text style={styles.table_text}>{value.economy_class}</Text>
                  <Text style={styles.table_text}>{value.super_class}</Text>
                  <Text style={styles.table_text}>{value.premier_grand}</Text>
                  <Text style={styles.table_text}>{value.vip_cabin}</Text>
                  <Text style={styles.table_text}>{value.total_pax}</Text>
                  <Text style={styles.table_text}>{value.crew}</Text>
                  <Text style={styles.table_text}>
                    {value.generate_time_text}
                  </Text>
                  <Link
                    href={{
                      pathname: "/detail02",
                      params: {
                        id: value.id.toString(),
                        start_place: value.starting_place,
                        end_place: value.ending_place,
                        departure_date: value.date,
                      },
                    }}
                    style={{
                      padding: 8,
                      margin: 4,
                      borderRadius: 8,
                      backgroundColor: Colors[theme ?? "light"].tint,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        flexWrap: "wrap",
                      }}
                    >
                      Detail
                    </Text>
                  </Link>
                </View>
              ))
            )}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scrol: {
    marginVertical: 16,
    width: "100%",
    paddingHorizontal: generalStyles.paddingHorizontal,
  },
  table_head: {
    flexDirection: "row",
    gap: 8,
  },
  table_head_text: {
    width: 60,
    flexWrap: "wrap",
    fontWeight: "bold",
    fontSize: 16,
  },
  table_text: {
    width: 60,
    flexWrap: "wrap",
    fontSize: 16,
  },
});
