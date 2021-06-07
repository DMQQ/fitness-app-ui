import React, { useState } from "react";

//prettier-ignore
import { ScrollView,View,StyleSheet,TouchableOpacity,Text,Alert,} from "react-native";

import CustomBtn from "../../buttons/CustomBtn";
import useFetch from "../../../hooks/useFetch";

export default function TrainingList({ list, setTrigger }) {
  const { HTTP, error } = useFetch();

  const DeleteActivity = async (id) => {
    await HTTP("/delete/activity/" + id, "DELETE");
    if (!error) {
      setTrigger((trigger) => trigger + 1);
    }
    if (error) {
      Alert.alert("Error", "Sorry but something went wrong!");
    }
  };
  return (
    <ScrollView style={{ width: "100%" }}>
      {list &&
        list.map((activity) => {
          return (
            <Activity
              key={activity.id}
              {...activity}
              DeleteActivity={DeleteActivity}
            />
          );
        })}
    </ScrollView>
  );
}

//prettier-ignore
const Activity = ({ id,type, dateadd, distance, time, calories, water, DeleteActivity,}) => {
  const [show, setShow] = useState(false);

  return (
    <TouchableOpacity key={id} style={styles.container} activeOpacity={0.9}>
      <View
        style={styles.center}
      >
        <Text style={[styles.text, { width: "40%" }]}>{type}</Text>
        <Text style={[styles.text, { width: "40%" }]}>{dateadd}</Text>
        <TouchableOpacity
          style={styles.showMoreBtn}
          onPress={() => setShow(!show)}
          activeOpacity={0.8}
        >
          <Text style={{ fontSize: 20, color: "black" }}>
            {show ? "-" : "+"}
          </Text>
        </TouchableOpacity>
      </View>
      {show && (
        <View>
          <View style={{ alignItems: "center" }}>
            <View style={styles.bar}></View>
          </View>
          <Text style={styles.subText}>🍔Calories: {calories}kcal</Text>
          <Text style={styles.subText}>🚲distance: {distance}km</Text>
          <Text style={styles.subText}>⌛time: {time}h</Text>
          <Text style={styles.subText}>🥛water: {water}ml</Text>
          <View style={{ alignItems: "center", margin: 5 }}>
            <CustomBtn
              title="Delete"
              styles={{ padding: 10, width: "80%" }}
              func={() => DeleteActivity(id)}
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#004D73",
    width: "100%",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 22,
    color: "white",
  },
  showMoreBtn: {
    backgroundColor: "white",
    height: 30,
    width: 30,
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  subText: {
    color: "#DEDEDE",
    fontSize: 20,
  },
  bar: {
    width: 100,
    height: 5,
    backgroundColor: "white",
    borderRadius: 20,
    margin: 10,
  },
  center: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
