import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { Link, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Text as T } from "../components/Themed";
import { generalStyles } from "../constants/GeneralStyles";
import { useInfiniteQuery } from "@tanstack/react-query";
import { TsServices } from "../services/Ts.service";
import { useToken } from "../store/AuthStore";
import LinearGradientBackground from "../components/LinearGradientBackground";
import CusDetailHeader from "../components/CusDetailHeader";
import { TS02Header } from "../types/component";
import Colors from "../constants/Colors";
import { TS02Detail } from "../types/response";
import { useIsFocused } from "@react-navigation/native";

const detail02 = () => {
  const params = useLocalSearchParams();
  const theme = useColorScheme();
  const isFocus = useIsFocused();
  const token = useToken();
  const getTS02Detail = useInfiniteQuery<TS02Detail>({
    initialPageParam: 1,
    queryKey: ["ts02_detail", params.id],
    queryFn: ({ pageParam }) =>
      TsServices.getTS02Detail({
        id: params.id as string,
        page: pageParam as number,
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
    enabled: !!token,
  });

  const _onMomentumScrollEnd = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const isCloseToBottom =
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >
      nativeEvent.contentSize.height - 30;
    if (isCloseToBottom) {
      if (
        getTS02Detail.data?.pages[getTS02Detail.data.pages.length - 1]
          .is_more !== 0 &&
        getTS02Detail.hasNextPage
      )
        getTS02Detail.fetchNextPage();
    }
  };

  const refresh = () => {
    getTS02Detail.refetch();
  };

  useFocusEffect(
    useCallback(() => {
      isFocus && refresh();
    }, [isFocus])
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrol}
        onMomentumScrollEnd={_onMomentumScrollEnd}
        refreshControl={
          <RefreshControl
            refreshing={getTS02Detail.isFetching}
            onRefresh={refresh}
          />
        }
        contentContainerStyle={{ paddingVertical: 16, gap: 16 }}
      >
        <CusDetailHeader {...(params as TS02Header)} />
        <ScrollView
          horizontal
          style={{
            borderRadius: 4,
            borderColor: "rgba(0,0,0,0.1)",
            backgroundColor: Colors[theme ?? "light"].background,
            borderWidth: 1,
          }}
          contentContainerStyle={{
            width: 31 * 60,
            flexWrap: "wrap",
            padding: 8,
          }}
        >
          <View
            style={{
              ...styles.table_head,
            }}
          >
            <Text style={styles.table_head_text}>Trip Designation</Text>
            <Text style={styles.table_head_text}>Vessel Name</Text>
            <Text style={styles.table_head_text}>Departure Time</Text>
            <Text style={styles.table_head_text}>Arrive Time</Text>
            <Text style={styles.table_head_text}>Economy Class</Text>
            <Text style={styles.table_head_text}>Super Class</Text>
            <Text style={styles.table_head_text}>Premier Grand</Text>
            <Text style={styles.table_head_text}>VIP Cabin</Text>
            <Text style={styles.table_head_text}>
              Economy Class Complimentary
            </Text>
            <Text style={styles.table_head_text}>
              Super Class Complimentary
            </Text>
            <Text style={styles.table_head_text}>
              Premier Grand Complimentary
            </Text>
            <Text style={styles.table_head_text}>VIP Cabin Complimentary</Text>
            <Text style={styles.table_head_text}>Total PAX</Text>
            <Text style={styles.table_head_text}>Crew</Text>
            <Text style={styles.table_head_text}>Crew For Relieving</Text>
            <Text style={styles.table_head_text}>Group PAX</Text>
            <Text style={styles.table_head_text}>Infant</Text>
            <Text style={styles.table_head_text}>Child</Text>
            <Text style={styles.table_head_text}>DOB</Text>
            <Text style={styles.table_head_text}>Luggage</Text>
            <Text style={styles.table_head_text}>Prepared By</Text>
            <Text style={styles.table_head_text}>Verified By</Text>
            <Text style={styles.table_head_text}>Generated Time</Text>
            <Text style={styles.table_head_text}>Remark</Text>
            <Text style={styles.table_head_text}>Delay Departure Code</Text>
            <Text style={styles.table_head_text}>Operate</Text>
            <Text style={styles.table_head_text}>History</Text>
          </View>
          {getTS02Detail.isSuccess &&
            getTS02Detail.data.pages.map((_item, i) =>
              _item.data.map((value, i) => (
                <View
                  style={{
                    ...styles.table_head,
                    borderTopColor: "rgba(0,0,0,0.2)",
                    borderTopWidth: 1,
                  }}
                  key={`TS02-${value.id}`}
                >
                  <Text style={styles.table_text}>
                    {value.trip_designation}
                  </Text>
                  <Text style={styles.table_text}>{value.boat_name}</Text>
                  <Text style={styles.table_text}>{value.departure_time}</Text>
                  <Text style={styles.table_text}>{value.achieve_time}</Text>
                  <Text style={styles.table_text}>{value.economy_class}</Text>
                  <Text style={styles.table_text}>{value.super_class}</Text>
                  <Text style={styles.table_text}>{value.premier_grand}</Text>
                  <Text style={styles.table_text}>{value.vip_cabin}</Text>
                  <Text style={styles.table_text}>
                    {value.economy_class_complimentary}
                  </Text>
                  <Text style={styles.table_text}>
                    {value.super_class_complimentary}
                  </Text>
                  <Text style={styles.table_text}>
                    {value.premier_grand_complimentary}
                  </Text>
                  <Text style={styles.table_text}>
                    {value.vip_cabin_complimentary}
                  </Text>
                  <Text style={styles.table_text}>{value.total_pax}</Text>
                  <Text style={styles.table_text}>{value.crew}</Text>
                  <Text style={styles.table_text}>
                    {value.crew_for_relieving}
                  </Text>
                  <Text style={styles.table_text}>{value.group_pax}</Text>
                  <Text style={styles.table_text}>{value.baby}</Text>
                  <Text style={styles.table_text}>{value.child}</Text>
                  <Text style={styles.table_text}>{value.dob}</Text>
                  <Text style={styles.table_text}>{value.luggage}</Text>
                  <Text style={styles.table_text}>{value.prepared_by}</Text>
                  <Text style={styles.table_text}>{value.verified_by}</Text>
                  <Text style={styles.table_text}>{value.generate_time}</Text>
                  <Text style={styles.table_text}>{value.remark}</Text>
                  <Text style={styles.table_text}>
                    {value.delay_departure_code}
                  </Text>
                  <Link
                    href={{
                      pathname: "/create01",
                      params: {
                        tag: "edit",
                        ...value,
                        id: value.trips,
                        ending_place_id: value.ending_place_id.toString(),
                        starting_place_id: value.starting_place_id.toString(),
                        starting_place: params.start_place,
                        ending_place: params.end_place,
                      } as any,
                    }}
                    style={{
                      padding: 8,
                      margin: 4,
                      borderRadius: 8,
                      maxHeight: 38,
                      backgroundColor: Colors[theme ?? "light"].tint,
                    }}
                  >
                    <Text
                      style={{
                        flexWrap: "wrap",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Edit
                    </Text>
                  </Link>
                  <View style={styles.table_text}>
                    {value.logs.length > 0 &&
                      value.logs.map((_value, i) => (
                        <Text style={{ ...styles.table_text, fontSize: 12 }}>
                          {`${i + 1} - ${_value.username}:${
                            _value.create_time_format
                          }`}
                        </Text>
                      ))}
                  </View>
                </View>
              ))
            )}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default detail02;

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
    maxWidth: 60,
  },
});
