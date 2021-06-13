import { BarChart } from "react-native-chart-kit";
import React from "react";

const screenWidth = 350;

const chartConfig = {
   backgroundGradientFrom: "#003FD7",
   backgroundGradientTo: "#003FD7",
   color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
   strokeWidth: 1,
   barPercentage: 0.5,
   horizontalLabelRotation: 0,
   verticalLabelRotation: 0,
};

export default function RightActionChart({ data = [0, 0], labels = [0, 0] }) {
   return (
      <BarChart
         style={{ borderRadius: 20 }}
         data={{
            labels: labels,
            datasets: [
               {
                  data,
               },
            ],
         }}
         width={screenWidth}
         height={220}
         chartConfig={chartConfig}
         verticalLabelRotation={30}
      />
   );
}
