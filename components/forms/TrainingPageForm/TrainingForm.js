import React, { useContext, useEffect, useRef, useState } from "react";

import { Alert, View, Text } from "react-native";
import Input from "../input";
import CustomBtn from "../../buttons/CustomBtn";

import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/AuthContext";
import OptionsList from "./Optionslist";

export default function TrainingFrom({ setTrigger }) {
  const [activityType, setActivityType] = useState();
  const [hideOptions, setHideOptions] = useState(false);
  const { isAuth } = useContext(AuthContext);

  const [distance, setDistance] = useState();
  const [time, setTime] = useState();
  const [water, setWater] = useState();
  const [calories, setCalories] = useState();
  const [heartRate, setHeartRate] = useState();

  const [invalidInput, setInvalidInput] = useState(false);

  const { data, HTTP, error, loading } = useFetch();

  const addActivity = async () => {
    if (!distance || !time) {
      return setInvalidInput(true);
    }

    await HTTP("/post/activity", "POST", {
      type: activityType,
      distance: +distance,
      time: +time,
      heartRate: heartRate ? +heartRate : 0,
      calories: calories ? +calories : 0,
      water: water ? +water : 0,
      user_id: +isAuth.id,
    });
    if (error) {
      Alert.alert("Someting went wrong:", error);
    }
    if (!loading || data) {
      Alert.alert("Success", "Training added succesfuly");

      setTrigger((trigger) => trigger + 1);
      setInvalidInput(false);
      setActivityType("");
    }
  };

  return (
    <View>
      {!hideOptions && (
        <OptionsList
          {...{
            setActivityType: setActivityType,
            setHideOptions: setHideOptions,
          }}
        />
      )}
      {!!activityType && (
        <View style={{ padding: 25 }}>
          <Text style={{ textAlign: "center", fontSize: 22, color: "#A63030" }}>
            {invalidInput && "Enter data!!"}
          </Text>
          <Input
            more={{ placeholder: "Distance" }}
            val={distance}
            setVal={setDistance}
            error={invalidInput}
          />
          <Input
            more={{ placeholder: "Time" }}
            val={time}
            setVal={setTime}
            error={invalidInput}
          />
          <Input
            more={{ placeholder: "Water Optional" }}
            val={water}
            setVal={setWater}
          />
          <Input
            more={{ placeholder: "Heart rate Optional" }}
            val={heartRate}
            setVal={setHeartRate}
          />
          <Input
            more={{ placeholder: "Calories Optional" }}
            val={calories}
            setVal={setCalories}
          />
          <CustomBtn
            title={loading ? "loading" : "submit"}
            func={addActivity}
          />
        </View>
      )}
    </View>
  );
}
