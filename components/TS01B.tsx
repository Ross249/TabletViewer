import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CrewData, TS01B, TS01BProps } from "../types/component";
import CusInput from "./CusInput";
import DatetimeSelector from "./DatetimeSelector";
import moment from "moment";
import PreparedBySelector from "./PreparedBySelector";

const TS01FormB: React.FC<TS01BProps> = (props) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap",
          gap: 10,
          marginTop: 16,
        }}
      >
        <CusInput
          disable={false}
          value={props.vip_cabin}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01B) => {
              return {
                ...(prev as TS01B),
                vip_cabin: text,
              };
            });
          }}
          title={"VIP Cabin"}
          rate={props.vip_cabin_rate}
        />
        <CusInput
          disable={false}
          value={props.vip_cabin_complimentary}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01B) => {
              return {
                ...(prev as TS01B),
                vip_cabin_complimentary: text,
              };
            });
          }}
          title={"VIP Cabin Complimentary"}
          rate={props.vip_cabin_rate}
        />

        <CusInput
          disable={false}
          value={props.premier_grand}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01B) => {
              return {
                ...(prev as TS01B),
                premier_grand: text,
              };
            });
          }}
          title={"Premier Grand"}
          rate={props.premier_grand_rate}
        />

        <CusInput
          disable={false}
          value={props.premier_grand_complimentary}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01B) => {
              return {
                ...(prev as TS01B),
                premier_grand_complimentary: text,
              };
            });
          }}
          title={"Premier Grand Complimentary"}
          rate={props.premier_grand_rate}
        />

        <CusInput
          disable={false}
          value={props.super_class}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01B) => {
              return {
                ...(prev as TS01B),
                super_class: text,
              };
            });
          }}
          title={"Super Class"}
          rate={props.super_class_rate}
        />
        <CusInput
          disable={false}
          value={props.super_class_complimentary}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01B) => {
              return {
                ...(prev as TS01B),
                super_class_complimentary: text,
              };
            });
          }}
          title={"Super Class Complimentary"}
          rate={props.super_class_rate}
        />

        <CusInput
          disable={false}
          value={props.economy_class}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01B) => {
              return {
                ...(prev as TS01B),
                economy_class: text,
              };
            });
          }}
          title={"Economy Class"}
          rate={props.economy_class_rate}
        />

        <CusInput
          disable={false}
          value={props.economy_class_complimentary}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01B) => {
              return {
                ...(prev as TS01B),
                economy_class_complimentary: text,
              };
            });
          }}
          title={"Economy Class Complimentary"}
          rate={props.economy_class_rate}
        />

        <CusInput
          disable={false}
          value={props.total_pax}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01B) => {
              return {
                ...(prev as TS01B),
                total_pax: text,
              };
            });
          }}
          title={"Total No. of Pax"}
        />

        <CusInput
          disable={false}
          value={props.infant}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01B) => {
              return {
                ...(prev as TS01B),
                infant: text,
              };
            });
          }}
          title={"Infant"}
        />

        <CusInput
          disable={false}
          value={props.child}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01B) => {
              return {
                ...(prev as TS01B),
                child: text,
              };
            });
          }}
          title={"Child"}
        />
        <CusInput
          disable={false}
          value={props.dob}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01B) => {
              return {
                ...(prev as TS01B),
                dob: text,
              };
            });
          }}
          title={"DOB"}
        />

        <CusInput
          disable={false}
          value={props.luggage}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01B) => {
              return {
                ...(prev as TS01B),
                luggage: text,
              };
            });
          }}
          title={"Luggage"}
        />

        <DatetimeSelector
          disable={false}
          title="Arrive Time"
          type="time"
          value={props.arrived_at}
          onChange={(date) => {
            // @ts-ignore
            props.setData((prev: TS01B) => {
              return {
                ...(prev as TS01B),
                arrived_at: moment(date).format("HH:mm"),
              };
            });
          }}
        />

        <DatetimeSelector
          disable={false}
          title="Submit Time"
          type="time"
          value={props.submitted_at}
          onChange={(date) => {
            // @ts-ignore
            props.setData((prev: TS01B) => {
              return {
                ...(prev as TS01B),
                submitted_at: moment(date).format("HH:mm"),
              };
            });
          }}
        />
        <PreparedBySelector
          title="Prepared By"
          value={props.prepared_by}
          onChange={(new_crew: CrewData) => {
            // @ts-ignore
            props.setData((prev: TS01B) => {
              return {
                ...(prev as TS01B),
                prepared_by: new_crew,
              };
            });
          }}
        />
        <CusInput
          disable={false}
          value={props.remarks}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01B) => {
              return {
                ...(prev as TS01B),
                remarks: text,
              };
            });
          }}
          title={"Remarks"}
        />
        <CusInput
          disable={false}
          value={props.delay_departure_code}
          onChange={(text) => {
            // @ts-ignore
            props.setData((prev: TS01B) => {
              return {
                ...(prev as TS01B),
                delay_departure_code: text,
              };
            });
          }}
          title={"Delay Departure Code"}
        />
      </View>
    </View>
  );
};

export default TS01FormB;

const styles = StyleSheet.create({});
