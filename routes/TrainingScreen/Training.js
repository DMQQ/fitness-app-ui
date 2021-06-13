import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Alert, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Bar from "../../components/design/bar";

import BigChart from "../../components/chart/BigChart";
import TrainingFrom from "../../components/forms/TrainingPageForm/TrainingForm";
import CustomBtn from "../../components/buttons/CustomBtn";
import { AuthContext } from "../../context/AuthContext";
import TrainingList from "../../components/forms/TrainingPageForm/TrainingList";

import { styles } from "./style.js";
import useGet from "../../hooks/useGet";

export default function Training() {
   const [addActivity, setAddActivity] = useState(false);
   const { isAuth } = useContext(AuthContext);
   const [trigger, setTrigger] = useState(0);
   const { data: list, error } = useGet("/get/activity/" + isAuth?.id, [
      trigger,
   ]);
   const [time, setTime] = useState(0);
   const [water, setWater] = useState(0);
   const [distance, setDistance] = useState(0);

   useEffect(() => {
      if (list?.length > 0) {
         setTime(list[0]?.time);
         setWater(list[0]?.water);
         setDistance(list[0]?.distance);
      }
      if (error) {
         Alert.alert("Error", "Something went wrong" + error);
      }
   }, [list, trigger]);

   const WaterGoal = 2000;
   const DistanceGoal = 20;
   const TimeGoal = 5;

   return (
      <ScrollView style={{ marginBottom: 60 }}>
         <ImageBackground
            source={require("../../images/bg.jpg")}
            style={styles.container}
         >
            <Text style={styles.title}>
               Training <Icon name="running" size={30} color="white" />
            </Text>
            <Bar />
            <View style={styles.rowDiv}>
               <BigChart
                  size={110}
                  color={"#EA8500"}
                  proggress={(time / TimeGoal) * 100}
                  width={15}
               />
               <BigChart
                  size={110}
                  color={"#4500EE"}
                  proggress={(water / WaterGoal) * 100}
                  width={15}
               />
               <BigChart
                  size={110}
                  color={"#B83030"}
                  proggress={(distance / DistanceGoal) * 100}
                  width={15}
               />
            </View>
            <View style={[styles.rowDiv, { justifyContent: "space-around" }]}>
               <Text style={styles.text}>{time}h</Text>
               <Text style={styles.text}>{water}ml</Text>
               <Text style={styles.text}>{distance}km</Text>
            </View>
         </ImageBackground>
         {addActivity && (
            <CustomBtn
               title="X"
               styles={{ width: 40, padding: 5, margin: 10 }}
               color="black"
               func={() => setAddActivity(false)}
            />
         )}
         <View>
            {!addActivity ? (
               <View style={{ alignItems: "center" }}>
                  <CustomBtn
                     title="Add Activity"
                     func={() => setAddActivity(!addActivity)}
                     styles={{ marginTop: 30, width: "80%", borderRadius: 10 }}
                     color="#004D73"
                     icon="running"
                  />
               </View>
            ) : (
               <TrainingFrom setTrigger={setTrigger} />
            )}
            <View style={{ alignItems: "center", margin: 20 }}>
               <Bar />
               <TrainingList list={list} setTrigger={setTrigger} />
            </View>
         </View>
      </ScrollView>
   );
}
