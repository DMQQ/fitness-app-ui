export function FillHomeArray(TrainingData) {
   const TrainingSpeed =
      TrainingData?.length > 0 &&
      TrainingData[0]?.distance / TrainingData[0]?.time;
   return [
      {
         name: "Heart",
         icon: "heartbeat",
         data:
            TrainingData &&
            TrainingData.length > 0 &&
            TrainingData[0]?.heartRate + "bpm",
      },
      {
         name: "Distance",
         icon: "compass",
         data:
            TrainingData &&
            TrainingData.length > 0 &&
            TrainingData[0].distance + "km",
      },
      {
         name: "Speed",
         icon: "wind",
         data: Math.trunc(TrainingSpeed) + "km/h",
      },
   ];
}
