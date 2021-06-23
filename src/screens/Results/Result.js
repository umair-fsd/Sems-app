import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { AntDesign, Octicons } from "@expo/vector-icons";
const Result = ({ navigation, correct, incorrect, total }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exam Results</Text>
      <View style={styles.resultContainer}>
        <Text style={{ fontSize: 25, bottom: 3, left: 5 }}>
          Total Questions: {total}
        </Text>
        <View style={styles.row}>
          <View style={{ margin: 20, flexDirection: "row" }}>
            <AntDesign name="checkcircle" size={30} color="green" />
            <Text style={{ fontSize: 25, bottom: 3, left: 5 }}>Correct</Text>
          </View>

          <View style={{ margin: 20 }}>
            <Text style={{ fontSize: 25, bottom: 5 }}>
              {correct}/{incorrect}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{ margin: 20, flexDirection: "row", left: -15 }}>
            <Octicons name="checklist" size={30} color="green" />
            <Text style={{ fontSize: 25, bottom: 3, left: 5 }}>Mark</Text>
          </View>
          <View style={{ margin: 20 }}>
            <Text style={{ fontSize: 25, bottom: 5 }}>{correct}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.reset({
              routes: [{ name: "Home" }],
            });
          }}
        >
          <Text style={styles.backButton}>Back to Home </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gray,
  },
  title: {
    fontSize: SIZES.h1,
  },
  resultContainer: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    height: 400,

    //box Shaddow
    shadowColor: "#0000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  row: {
    flexDirection: "row",
  },
  line: {
    top: 20,
    borderBottomWidth: 1,
    width: "100%",
    borderBottomColor: "darkgray",
  },
  backButton: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    paddingHorizontal: 30,
    paddingVertical: 10,
    fontSize: 15,
    borderRadius: 10,
  },
});
