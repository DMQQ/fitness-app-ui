import React from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Swipeable from "react-native-gesture-handler/Swipeable";

import RightActionChart from "./LineChart";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
   backgroundColor: "#e26a00",
   backgroundGradientFrom: "#009B85",
   backgroundGradientTo: "#009B85",
   strokeWidth: 3,
   color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
   strokeWidth: 2,
   barPercentage: 0.5,
};

export default function WeightChart({ values, labels = [] }) {
   const labelFix = labels.map((el) => el.split(" ")[1]);
   function RightItem() {
      return (
         <View style={{ width: "100%" }}>
            <RightActionChart data={values} labels={labelFix} />
         </View>
      );
   }

   return (
      <Swipeable renderRightActions={RightItem}>
         <View style={{ marginBottom: 20 }}>
            <LineChart
               data={{
                  labels: labelFix,
                  datasets: [
                     {
                        data: values,
                     },
                  ],
               }}
               width={screenWidth - 40}
               height={220}
               chartConfig={chartConfig}
               style={{ borderRadius: 20 }}
            />
         </View>
      </Swipeable>
   );
}
