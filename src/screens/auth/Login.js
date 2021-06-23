import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-paper";
import { Container, Header, Content, Tab, Tabs } from "native-base";
import { COLORS, SIZES } from "../../constants";
import axios from "axios";
import qs from "qs";
import { SERVER_URL, STUDENT_LOGIN, TEACHER_LOGIN } from "../../api/requests";

//import AsyncStorage from "@react-native-async-storage/async-storage";

/////TEMP IMPORTS

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isdisabled, setIsDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const renderLoginForm = () => {
    ////Store Token and User_ID to Local Storage///
    // const storeData = async (token, user_id, email) => {
    //   try {
    //     await AsyncStorage.setItem("@token", token);
    //     await AsyncStorage.setItem("@user_id", user_id.toString());
    //     await AsyncStorage.setItem("@user_email", email);
    //   } catch (e) {
    //     // saving error
    //   }
    // };

    const teacherLogin = async () => {
      setLoading(true);
      if (email == "") {
        alert("Please Enter Email Address");
        setLoading(false);
      } else if (password == "") {
        alert("Please Enter Password");
        setLoading(false);
      } else {
        await axios({
          method: "post",
          url: `${SERVER_URL}${TEACHER_LOGIN}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: qs.stringify({
            teacher_email: email,
            teacher_password: password,
          }),
        })
          .then((res) => {
            if (res.data == 0) {
              alert("Invalid Email or Password");
            } else {
              navigation.reset({
                routes: [{ name: "Admin" }],
              });
            }
            console.log(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    const studentLogin = async () => {
      setLoading(true);
      if (email == "") {
        alert("Please Enter Email Address");
        setLoading(false);
      } else if (password == "") {
        alert("Please Enter Password");
        setLoading(false);
      } else {
        await axios({
          method: "post",
          url: `${SERVER_URL}${STUDENT_LOGIN}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: qs.stringify({
            student_email: email,
            student_password: password,
          }),
        })
          .then((res) => {
            if (res.data == 0) {
              alert("Invalid Email or Password");
            } else {
              navigation.reset({
                routes: [{ name: "Home" }],
              });
            }
            console.log(res.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    return (
      <>
        <View style={styles.topView}>
          {/* <Image
            source={require("../../assets/metalogo.png")}
            style={{ marginTop: 10, width: "80%", height: 100 }}
          /> */}
          <Image
            source={require("../../../assets/GCUWF.png")}
            style={{
              width: 120,
              height: 120,
              borderRadius: 100,
              marginTop: 30,
            }}
          />
          <Text style={{ fontSize: 40, color: "white" }}>SEMS</Text>
        </View>
        <View style={styles.bottomView}>
          <Tabs>
            <Tab heading="Student Login">
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Student Email"
                  onChangeText={(v) => {
                    setEmail(v);
                  }}
                />
                <TextInput
                  secureTextEntry
                  style={styles.inputStyle}
                  placeholder="Password"
                  onChangeText={(v) => {
                    setPassword(v);
                  }}
                />
                {loading == true ? (
                  <ActivityIndicator size={"large"} color={COLORS.primary} />
                ) : null}
                <Button
                  style={styles.btnStyle}
                  mode={"outlined"}
                  onPress={studentLogin}
                >
                  <Text style={{ color: COLORS.white, fontSize: SIZES.h3 }}>
                    Login
                  </Text>
                </Button>
              </View>
            </Tab>
            <Tab heading="Teacher Login">
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Teacher Email"
                  onChangeText={(v) => {
                    setEmail(v);
                  }}
                />
                <TextInput
                  secureTextEntry
                  style={styles.inputStyle}
                  placeholder="Password"
                  onChangeText={(v) => {
                    setPassword(v);
                  }}
                />
                {loading == true ? (
                  <ActivityIndicator size={"large"} color={COLORS.primary} />
                ) : null}
                <Button
                  style={styles.btnStyle}
                  mode={"outlined"}
                  onPress={teacherLogin}
                >
                  <Text style={{ color: COLORS.white, fontSize: SIZES.h3 }}>
                    Login
                  </Text>
                </Button>
              </View>
            </Tab>
          </Tabs>
        </View>
      </>
    );
  };
  return renderLoginForm();
};

export default Login;

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  headingStyle: { fontSize: SIZES.h1, color: COLORS.white, fontWeight: "300" },
  ////////Bottom View///////
  bottomView: {
    flex: 1.5,
    marginBottom: -70,
    // alignItems: "center",
  },
  inputStyle: {
    borderColor: 1,
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 10,
    width: Dimensions.get("window").width / 1.2,
    fontSize: SIZES.h3,
    margin: 10,
    borderRadius: 10,
  },
  btnStyle: {
    marginTop: 10,
    padding: 5,
    width: Dimensions.get("window").width / 1.5,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    tintColor: "white",
  },
});
