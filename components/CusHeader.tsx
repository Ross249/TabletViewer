import { StyleSheet, View, Pressable } from "react-native";
import React from "react";
import { Text } from "./Themed";
import { generalStyles } from "../constants/GeneralStyles";
import { CusHeaderProps } from "../types/component";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

const CusHeader = (props: CusHeaderProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <Pressable
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Ionicons name="menu-outline" size={24} color="black" />
      </Pressable>
      <Text style={styles.headerTitle}>{props.title}</Text>
      {!!props.children ? (
        props.children
      ) : (
        <View style={{ opacity: 0 }}>
          <Feather name="plus" size={24} color="black" />
        </View>
      )}
    </View>
  );
};

export default CusHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    marginTop: generalStyles.marginTop,
    paddingHorizontal: generalStyles.paddingHorizontal,
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
