import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
   title: {
      marginTop: 50,
      fontSize: 30,
      color: "#004D73",
      fontWeight: "bold",
      letterSpacing: 2,
   },
   container: {
      flex: 1,
      padding: 10,
      marginBottom: 60,
   },
   statsContainer: {
      width: "100%",
      marginTop: 25,
      height: 70,
      backgroundColor: "#004D73",
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "row",
   },
   catContainer: {
      height: "80%",
      width: 100,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
   },
   formContainer: {
      width: "100%",
      padding: 40,
      margin: 10,
   },
   RightAction: {
      backgroundColor: "red",
      padding: 10,
      borderRadius: 10,
      marginTop: 10,
      width: "100%",
   },
   ListItemContainer: {
      backgroundColor: "#004D73",
      width: "100%",
      marginTop: 10,
      padding: 15,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-around",
   },
   chartContainer: {
      alignItems: "center",
      marginBottom: 50,
      borderRadius: 50,
      margin: 10,
      justifyContent: "center",
   },
});
