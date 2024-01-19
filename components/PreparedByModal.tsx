import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { CrewData, PreparedProps } from "../types/component";
import { TsServices } from "../services/Ts.service";
import { useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import Colors from "../constants/Colors";
import { Text as T } from "./Themed";
import { Feather } from "@expo/vector-icons";

const PreparedByModal: React.FC<PreparedProps> = (props) => {
  const theme = useColorScheme();
  const [selected, setSelected] = useState<CrewData>();
  const vesselList = useQuery<CrewData[]>({
    queryKey: ["staff_list"],
    queryFn: TsServices.getStaffList,
  });
  const confirm = () => {
    if (selected) {
      props.setData(selected);
      setSelected(undefined);
      props.setShow(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Modal animationType="slide" transparent={true} visible={props.show}>
        <StatusBar backgroundColor={"rgba(0,0,0,0.5)"} />
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              marginTop: "auto",
              alignItems: "center",
              borderTopLeftRadius: 20,
              padding: 16,
              borderTopRightRadius: 20,
              backgroundColor: Colors[theme ?? "light"].background,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                paddingHorizontal: 16,
              }}
            >
              <T
                style={styles.font}
                onPress={() => {
                  props.setShow(false);
                }}
              >
                Cancel
              </T>
              <T style={styles.font} onPress={confirm}>
                Confirm
              </T>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width: "100%" }}
              contentContainerStyle={{
                paddingTop: 16,
                flexDirection: "row",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {vesselList.isFetching && (
                <View style={{ width: "100%", justifyContent: "center" }}>
                  <ActivityIndicator
                    color={Colors[theme ?? "light"].tint}
                    size={"large"}
                  />
                </View>
              )}
              {vesselList.isSuccess &&
                vesselList.data.map((item, i) => (
                  <Pressable
                    style={{
                      ...styles.card,
                      borderColor: Colors[theme ?? "light"].text_second,
                    }}
                    key={item.id}
                    onPress={() => {
                      setSelected(item);
                    }}
                  >
                    <T style={styles.card_font}>{item.username}</T>
                    {selected?.id === item.id ? (
                      <View style={{ marginLeft: 24 }}>
                        <Feather
                          name="check-square"
                          size={24}
                          color={Colors[theme ?? "light"].text_second}
                        />
                      </View>
                    ) : (
                      <View style={{ marginLeft: 24 }}>
                        <Feather
                          name="square"
                          size={24}
                          color={Colors[theme ?? "light"].text_second}
                        />
                      </View>
                    )}
                  </Pressable>
                ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PreparedByModal;

const styles = StyleSheet.create({
  font: {
    fontSize: 20,
  },
  card: {
    width: "49%",
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 4,
    borderWidth: 1,
    alignItems: "center",
  },
  card_font: {
    fontSize: 16,
    flexWrap: "wrap",
    maxWidth: "80%",
  },
});
