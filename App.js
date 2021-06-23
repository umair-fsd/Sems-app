import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/screens/auth/Login";
import Home from "./src/screens/Home/Home";
import Quiz from "./src/screens/Quiz/Quiz";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Result from "./src/screens/Results/Result";
import Admin from "./src/screens/Admin/Admin";
import AddSubjects from "./src/screens/Admin/AddSubjects";
import EditQuestions from "./src/screens/Admin/EditQuestions";
import AddQuestions from "./src/screens/Admin/AddQuestions";
import ManageQuestions from "./src/screens/Admin/ManageQuestions";
export default function App() {
  const Stack = createStackNavigator();
  return (
    <>
      <StatusBar style={"auto"} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={"Login"}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Quiz" component={Quiz} />
          <Stack.Screen name="Result" component={Result} />
          {/* Admin Screens */}
          <Stack.Screen name="Admin" component={Admin} />
          <Stack.Screen name="AddSubjects" component={AddSubjects} />
          <Stack.Screen name="AddQuestions" component={AddQuestions} />
          <Stack.Screen name="EditQuestions" component={EditQuestions} />
          <Stack.Screen name="ManageQuestions" component={ManageQuestions} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
