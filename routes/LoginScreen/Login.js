import AsyncStorage from "@react-native-community/async-storage";
import React, { useContext, useEffect, useRef, useState } from "react";
//prettier-ignore
import { View, Text, StyleSheet, Image,TouchableOpacity,KeyboardAvoidingView, Animated,Keyboard,Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Belt from "../../components/buttons/belt";
import Input from "../../components/forms/input";
import { AuthContext } from "../../context/AuthContext";
import * as CONSTS from "../../constants/constants";
import { Alert } from "react-native";
import { useRoute } from "@react-navigation/native";

import CustomBtn from "../../components/buttons/CustomBtn";

const Login = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState();
  const [goal, setGoal] = useState("");
  const [overlay, setOverlay] = useState(false);
  const { isAuth } = useContext(AuthContext);
  const route = useRoute();

  const HandleLogin = async (path) => {
    if (login && password) {
      await fetch(CONSTS.BACKEND + path, {
        method: "POST",
        body: JSON.stringify({ login, password }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Someting went wrong with request, try again");
          }
          if (res.status === 400) {
            throw new Error("Fields or password are incorrect");
          }
          if (res.status === 200 || res.status === 201) {
            return res.json();
          }
          if (res.status === 423) throw new Error("Error :C");
        })
        .then(async (data) => {
          if (!data) return Alert.alert("Something went wrong BRO :<");
          if (data) {
            await AsyncStorage.setItem(
              "fitness_app_user",
              JSON.stringify(data)
            );
            const Added = await AsyncStorage.getItem("fitness_app_user");
            if (Added) {
              navigation.navigate("Home");
            }
          }
        })
        .catch((err) => {
          if (err) {
            Alert.alert("Error", "Incrrect Password or failure on server");
          }
        });
    }
  };

  const val = useRef(new Animated.Value(250)).current;
  const val2 = useRef(new Animated.Value(500)).current;

  function Show(to) {
    Animated.spring(val, {
      duration: 200,
      toValue: to,
      useNativeDriver: false,
    }).start();
  }
  function ToggleRegister(to) {
    Animated.spring(val2, {
      duration: 200,
      toValue: to,
      useNativeDriver: false,
    }).start();
  }

  function closeAll() {
    ToggleRegister(500);
    Show(250);
    Keyboard.dismiss();
    setOverlay(false);
  }
  useEffect(() => {
    if (isAuth) {
      navigation.navigate("Home");
    }
  }, [isAuth, route.name]);

  return (
    <View style={styles.container}>
      <Text style={styles.greet}>Hi Bro</Text>
      <View style={styles.content}>
        <Image
          source={require("../../images/loginImg.png")}
          style={styles.img}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomBtn
          title={"Sign In"}
          func={() => {
            ToggleRegister(0);
            setOverlay(true);
          }}
        />
        <CustomBtn
          title={"Log In"}
          func={() => {
            Show(0);
            setOverlay(true);
          }}
          styles={{ backgroundColor: "green" }}
        />
      </View>

      <Animated.View
        style={[styles.modal, { transform: [{ translateY: val }] }]}
      >
        <Belt functions={closeAll} />
        <ScrollView style={{ padding: 20, paddingTop: 35 }}>
          <Input
            val={login}
            setVal={setLogin}
            more={{ placeholder: "Login" }}
          />
          <Input
            more={{
              placeholder: "Password",
            }}
            val={password}
            setVal={setPassword}
          />

          <CustomBtn title={"Log In"} func={() => HandleLogin("/auth")} />
        </ScrollView>
      </Animated.View>

      <Animated.View
        style={[
          styles.modal,
          { height: 400 },
          { transform: [{ translateY: val2 }] },
        ]}
      >
        <Belt functions={closeAll} more={{ margin: 10 }} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Input
            val={login}
            setVal={setLogin}
            more={{ placeholder: "Username", style: { margin: 10 } }}
          />
          <Input
            more={{ placeholder: "Password", style: { margin: 10 } }}
            val={password}
            setVal={setPassword}
          />
          <Input
            val={age}
            setVal={setAge}
            more={{ placeholder: "Age", style: { margin: 10 } }}
          />
          <Input
            val={goal}
            setVal={setGoal}
            more={{ placeholder: "What's your goal?", style: { margin: 10 } }}
          />
          <TouchableOpacity activeOpacity={0.7}>
            <Text
              style={[styles.button, { margin: 10 }]}
              onPres={() => HandleLogin("/register")}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Animated.View>
      {overlay && <View style={styles.overlay} onTouchStart={closeAll} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonContainer: {
    flex: 1,
    display: "flex",
    margin: 10,
  },
  button: {
    padding: 15,
    fontSize: 22,
    textAlign: "center",
    color: "white",
    borderRadius: 20,
    margin: 5,
    backgroundColor: "orange",
  },
  content: {
    flex: 3.5,
    justifyContent: "center",
    alignItems: "center",
  },
  greet: {
    fontSize: 50,
    padding: 20,
    marginTop: 50,
    textAlign: "center",
    fontWeight: "bold",
  },
  img: {
    width: 400,
    height: 400,
  },
  input: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
  modal: {
    position: "absolute",
    borderWidth: 0.5,
    backgroundColor: "white",
    display: "flex",
    width: "100%",
    borderRadius: 20,
    height: 250,
    borderColor: "grey",
    bottom: 0,
    zIndex: 2,
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.25)",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },
});

export default Login;
