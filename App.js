import React from "react";
import "react-native-gesture-handler";
import Home from "./routes/index";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./routes/LoginScreen/Login";

const Stack = createStackNavigator();

const horizontalAnimation = {
  gestureDirection: "horizontal",
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Login"
            component={Login}
            options={(horizontalAnimation, { headerShown: false })}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={(horizontalAnimation, { headerShown: false })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}
