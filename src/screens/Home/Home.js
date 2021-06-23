import SubjectCard from "./SubjectCard";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL, GET_SUBJECTS } from "../../api/requests";

const Home = ({ navigation }) => {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    axios
      .get(`${SERVER_URL}${GET_SUBJECTS}`)
      .then((res) => {
        setSubjects(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  console.log(subjects);
  return (
    <View style={styles.container}>
      {subjects?.map((item) => {
        return (
          <SubjectCard
            navigation={navigation}
            subject_name={item?.subject_name}
            subject_id={item?.subject_id}
          />
        );
      })}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
