import React from "react";

import CustomBtn from "../../buttons/CustomBtn";
import { ScrollView } from "react-native";

const RUNNING = "Running";
const SWIMMING = "Swimming";
const CYCLING = "Cycling";
const WALKING = "Walking";
const FITNESS = "Fitness";
const PLAYING_SPORT = "Sport";

export default function OptionsList({ setActivityType, setHideOptions }) {
  return (
    <ScrollView style={{ marginTop: 35 }}>
      <CustomBtn
        title={RUNNING}
        func={() => {
          setActivityType(RUNNING);
          setHideOptions(true);
        }}
      />
      <CustomBtn
        title={SWIMMING}
        func={() => {
          setActivityType(SWIMMING);
          setHideOptions(true);
        }}
        color="#4600B8"
      />
      <CustomBtn
        title={CYCLING}
        func={() => {
          setActivityType(CYCLING);
          setHideOptions(true);
        }}
        color="#6A3C00"
      />
      <CustomBtn
        title={WALKING}
        func={() => {
          setActivityType(WALKING);
          setHideOptions(true);
        }}
        color="#200043"
      />
      <CustomBtn
        title={FITNESS}
        func={() => {
          setActivityType(FITNESS);
          setHideOptions(true);
        }}
        color="#00775E"
      />
      <CustomBtn
        title={PLAYING_SPORT}
        func={() => {
          setActivityType(PLAYING_SPORT);
          setHideOptions(true);
        }}
        color="#CFBC02"
      />
    </ScrollView>
  );
}
