import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../../constants";

const SubjectCard = ({ subject_name, subject_id, navigation }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.subjectTitle}>{subject_name}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Quiz", {
            subject_id,
            count:0
          });
          
        }}
      >
        <Text style={styles.startbutton}>Take Exam</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubjectCard;

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    height: 150,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    //box Shaddow
    // shadowColor: "#0000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,

    // elevation: 1,
  },
  subjectTitle: {
    fontSize: SIZES.h1,
  },
  startbutton: {
    top: 25,
    borderWidth: 1,
    paddingHorizontal: 70,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    color: "white",
    fontWeight: "bold",
  },
});
