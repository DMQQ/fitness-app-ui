import React from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#009B85",
  backgroundGradientTo: "#009B85",
  strokeWidth: 3,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};

export default function WeightChart({ values, labels }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <LineChart
        data={{
          labels: labels,
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
  );
}
