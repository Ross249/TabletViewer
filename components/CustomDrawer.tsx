import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollViewProps,
} from "react-native";
import React from "react";
import UserProfileCardInDrawer from "./UserProfileCardInDrawer";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useAuthStore } from "../store/AuthStore";
import LogoutButton from "./LogoutButton";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <UserProfileCardInDrawer />
      <DrawerItemList {...props} />
      <LogoutButton />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
