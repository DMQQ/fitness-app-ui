import { StyleSheet, View, Text, ScrollView } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { Tile, TrippleTile } from "../../components/Tile";
import ChartTile from "../../components/chart/chartTile";
import Bar from "../../components/design/bar";
import useGet from "../../hooks/useGet";
import { FillHomeArray } from "../../helpers/FillHomeArray";

const HomePage = ({ data, id, waterData, food }) => {
   const [calories, setCalories] = useState(0);
   const [water, setWater] = useState(0);
   const { data: WeightData } = useGet("/get/weight/" + id, [id]);
   const { data: TrainingData } = useGet("/get/activity/" + id, [id]);

   useEffect(() => {
      if (food) {
         setCalories(food[0]?.calories || 0);
      }
      if (waterData) {
         setWater(waterData[0]?.water || 0);
      }
   }, [waterData, food]);

   const WeightDataOneExists = WeightData && WeightData.length > 1;
   const WeightLoss =
      WeightDataOneExists && WeightData[0].weight - WeightData[1].weight;

   const gotFat = WeightLoss > 0 ? `+${WeightLoss}` : WeightLoss;

   const arr = FillHomeArray(TrainingData);
   return (
      <View>
         <View style={styles.list}>
            <TrippleTile data={arr} />
            <View style={{ margin: 10, alignItems: "center" }}>
               <Text style={{ fontSize: 25, color: "#004D73" }}>
                  Last Activity
               </Text>
               <Bar />
            </View>
            <View style={styles.chartContainer}>
               <ChartTile
                  title={"Calories"}
                  proggress={(calories / 2000) * 100}
                  legend={calories + "kcal"}
                  color={"#e09422"}
               />
               <ChartTile
                  title={"Water"}
                  proggress={(water / 3000) * 100}
                  legend={water + "ml"}
                  color="#01A0EC"
               />
            </View>

            <Tile
               color={"#00C6CF"}
               icon="map-marked-alt"
               legend="last location"
               data="Olsztyn"
               color={["#00974D", "#00866F"]}
            />
            <Tile
               color={"#00C6CF"}
               icon="balance-scale"
               legend="weight tracking"
               data={gotFat ? gotFat + "kg" : "0kg"}
               color={["#0046BC", "#009BE2"]}
            />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   list: {
      alignItems: "center",
      padding: 10,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      marginTop: 15,
   },
   chartContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
   },
});

export default HomePage;
