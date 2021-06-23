import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import {
  SERVER_URL,
  GET_SUBJECTS,
  ADD_SUBJECT,
  DELETE_SUBJECT,
} from "../../api/requests";
import axios from "axios";
import qs from "qs";

const AddSubjects = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [subjetName, setSubjectName] = useState("");

  const getSubjects = async () => {
    await axios
      .get(`${SERVER_URL}${GET_SUBJECTS}`)
      .then((res) => {
        setSubjects(res.data);
        // console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveNewSubject = async () => {
    await axios({
      method: "post",
      url: `${SERVER_URL}${ADD_SUBJECT}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        subject_name: subjetName,
      }),
    })
      .then((res) => {
        if (res.data == "1") {
          alert("Subject Added");
          getSubjects();
        } else {
          alert("Server Error!");
        }
      })
      .catch();
  };
  const deleteSubject = async (id) => {
    await axios({
      method: "delete",
      url: `${SERVER_URL}${DELETE_SUBJECT}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        subject_id: id,
      }),
    })
      .then((res) => {
        if (res.data == "1") {
          alert("Subject Deleted");
          getSubjects();
        } else {
          alert("Server Error!");
          getSubjects();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSubjects();
  }, []);

  const RenderSubjects = ({ subject_id, subject_name }) => {
    return (
      <View style={styles.subjectsList}>
        <View style={styles.row}>
          <Text style={styles.subjectTitle}>{subject_name}</Text>
          <TouchableOpacity
            onPress={() => {
              deleteSubject(subject_id);
            }}
          >
            <Text>
              <AntDesign name="delete" size={24} color="red" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={"Enter Subject Name"}
        value={subjetName}
        onChangeText={(value) => setSubjectName(value)}
      />
      <TouchableOpacity onPress={saveNewSubject}>
        <Text style={styles.saveButton}>Save</Text>
      </TouchableOpacity>

      {loading == true ? (
        <ActivityIndicator size={"large"} color={COLORS.primary} />
      ) : (
        subjects?.map((item) => {
          return (
            <RenderSubjects
              subject_name={item.subject_name}
              subject_id={item.subject_id}
              key={item.subject_id}
            />
          );
        })
      )}
      <TouchableOpacity
        onPress={() => {
        
          navigation.goBack();
        }}
      >
        <Text style={[styles.saveButton, { marginTop: 30 }]}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddSubjects;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    fontSize: 15,
    width: "70%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: COLORS.white,
    borderRadius: 8,
    fontSize: 15,
  },
  subjectsList: {
    marginTop: 20,
    width: "80%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subjectTitle: {
    fontSize: 20,
  },
});
