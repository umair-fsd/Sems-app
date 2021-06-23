import React from "react";
import { StyleSheet, Text, TouchableOpacity, View ,Image} from "react-native";
import { COLORS, SIZES } from "../../constants";


const Admin = ({ subject_name, subject_id, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image source={require('../../../assets/GCUWF.png')} style={{width:100, height:100}} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddSubjects", {
              subject_id,
            });
            //   alert(subject_id);
          }}
        >
          <Text style={styles.startbutton}>Add / Delete Subjects</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddQuestions", {
              subject_id,
            });
            //   alert(subject_id);
          }}
        >
          <Text style={styles.startbutton}>Add Questions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ManageQuestions", {
              subject_id,
            });
            //   alert(subject_id);
          }}
        >
          <Text style={styles.startbutton}>Manage Questions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    height: "60%",
borderColor:'grey',
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
    width:280,
    textAlign:'center',
    top: 25,
    borderWidth: 1,
    paddingHorizontal: 70,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    color: "white",
    marginVertical: 10,
    fontWeight: "bold",
  },
});
