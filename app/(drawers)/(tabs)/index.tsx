import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
  Pressable,
} from "react-native";

import { Text } from "../../../components/Themed";
import { useAuthStore, useToken, useUserInfo } from "../../../store/AuthStore";
import { Link } from "expo-router";
import LinearGradientBackground from "../../../components/LinearGradientBackground";
import { generalStyles } from "../../../constants/GeneralStyles";
import { DrawerToggleButton } from "@react-navigation/drawer";
import CusHeader from "../../../components/CusHeader";
import Colors from "../../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import HomeBanner from "../../../components/HomeBanner";

export default function HomeScreen() {
  const theme = useColorScheme();
  const userInfo = useUserInfo();
  const token = useToken();

  return (
    <View style={styles.container}>
      <LinearGradientBackground />
      <CusHeader title="TS-01">
        {userInfo.group_id <= 1 && (
          <Pressable>
            <Feather name="plus" size={24} color="black" />
          </Pressable>
        )}
      </CusHeader>
      <ScrollView style={styles.scrol}>
        <HomeBanner />
        <Text>{token}</Text>
        <Link
          href={{
            pathname: "/modal",
            params: {
              url: `${process.env.EXPO_PUBLIC_API_URL}/privacy-policy.html`,
            },
          }}
        >
          dsas
        </Link>
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
