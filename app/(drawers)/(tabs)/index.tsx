import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
  Pressable,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
} from "react-native";

import { Text, View as V } from "../../../components/Themed";
import { useAuthStore, useToken, useUserInfo } from "../../../store/AuthStore";
import { Link, useFocusEffect } from "expo-router";
import LinearGradientBackground from "../../../components/LinearGradientBackground";
import { generalStyles } from "../../../constants/GeneralStyles";
import CusHeader from "../../../components/CusHeader";
import { Feather, Ionicons } from "@expo/vector-icons";
import HomeBanner from "../../../components/HomeBanner";
import { useInfiniteQuery } from "@tanstack/react-query";
import { TS01ListData } from "../../../types/response";
import { TsServices } from "../../../services/Ts.service";
import { useCallback, useEffect } from "react";
import TS01Card from "../../../components/TS01Card";
import { useIsFocused } from "@react-navigation/native";

export default function HomeScreen() {
  const isFocus = useIsFocused();
  const theme = useColorScheme();
  const userInfo = useUserInfo();
  const token = useToken();
  const getTSO1Lists = useInfiniteQuery<TS01ListData>({
    queryKey: ["TS_01"],
    queryFn: ({ pageParam }) => TsServices.get_ts01_list(pageParam as number),
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      console.log(
        `lastPage: ${lastPage?.current_page} allPages: ${allPages?.length} lastPageParam: ${lastPageParam} allPageParams: ${allPageParams.length} total:${lastPage.total}`
      );

      if (!token) {
        return false;
      } else {
        return lastPage.current_page + 1 > lastPage.total
          ? false
          : lastPage.current_page + 1;
      }
    },
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
      if (getTSO1Lists.hasNextPage) getTSO1Lists.fetchNextPage();
    }
  };

  const refresh = () => {
    getTSO1Lists.refetch();
  };

  useFocusEffect(
    useCallback(() => {
      isFocus && refresh();
    }, [isFocus])
  );

  return (
    <View style={styles.container}>
      <LinearGradientBackground />
      <CusHeader title="TS-01">
        {userInfo.group_id <= 1 && (
          <Link
            href={{
              pathname: "/create01",
              params: {
                tag: "create",
              },
            }}
          >
            <Feather name="plus" size={24} color="black" />
          </Link>
        )}
      </CusHeader>
      <ScrollView
        style={styles.scrol}
        onMomentumScrollEnd={_onMomentumScrollEnd}
        refreshControl={
          <RefreshControl
            refreshing={getTSO1Lists.isFetching}
            onRefresh={refresh}
          />
        }
        contentContainerStyle={{ paddingVertical: 16, gap: 16 }}
      >
        <HomeBanner />
        {getTSO1Lists.data?.pages.map((_page_data, i) =>
          _page_data.data.map((_data, i) => (
            <TS01Card {..._data} key={_data.id} />
          ))
        )}
      </ScrollView>
    </View>
  );
}

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
});
