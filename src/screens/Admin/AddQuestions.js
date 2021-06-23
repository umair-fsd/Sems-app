import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert
} from "react-native";
import { Header, Right } from "native-base";
import { List } from "react-native-paper";
import { COLORS, SIZES } from "../../constants";

import axios from "axios";

import { Ionicons, Entypo } from "@expo/vector-icons";
import { SERVER_URL, GET_SUBJECTS,ADD_QUESTION } from "../../api/requests";
import qs from "qs";

const AddQuestions = ({navigation}) => {

  const [subjectModal, setSubjectModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSubjectName, setSelectedSubjectName] = useState("");

  const [loading, setLoading] = useState(true);
  const [nodata, setNoData] = useState(false);
 

  const [subjects, setSubjects] = useState([]);
  const [key, setKey] = useState(0);

  const [question, setquestion] = useState('')
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const [option3, setOption3] = useState('')
  const [option4, setOption4] = useState('')
  const [answer, setAnswer] = useState('')

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



  const addQuestion = async()=>{
    if (selectedSubject == "" || question == "" || option1 == "" || option2 == "" || option3 == "" || option4 == ""|| answer == ""){
      alert('Please Fill All Fields')
    }else{

   
    await axios({
      method: "post",
      url: `${SERVER_URL}${ADD_QUESTION}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        subject_id: selectedSubject,
        question,
        option1,
        option2,
        option3,
        option4,
        answer
      }),
    })
      .then((res) => {
        alert("Question Added")
        ///check if user is Active
      fetchQuestions()
      setquestion("")
      setOption1("")
      setOption2("")
      setOption3("")
      setOption("")
      setAnswer("")
      })
      .catch((err) => {
        setNoData(false);
      });
    }

  }

  useEffect(() => {
    getSubjects();
  }, []);

  


  return (
    <View style={styles.container}>
      <Header
        style={{ backgroundColor: COLORS.primary }}
        androidStatusBarColor={COLORS.primary}
      >
        <Text
          style={{
            width: 300,
            textAlign: "center",
            color: COLORS.white,
            fontSize: SIZES.h2,
            alignSelf: "center",
            right: -50,
          }}
        >
        Add Question
        </Text>

        <View
          style={{
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            right: 20,
          }}
        >
  
        </View>
      </Header>
      {loading == true ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator color={COLORS.primary} size={"large"} />
          <Text
            style={{
              width: 200,
              textAlign: "center",

              color: COLORS.primary,
              fontSize: SIZES.h2,
              margin: 0,
            }}
          >
            Loading
          </Text>
        </View>
      ) : nodata == false ? (
        <View style={{ flex: 1 }}>
          <View>
          <TouchableOpacity
              onPress={() => {
                setSubjectModal(true);
              }}
            >
              <Text
                style={{
                  borderWidth: 1,
                  width: "80%",
                  alignSelf: "center",
                  marginVertical: 10,
                  fontSize: SIZES.h2,
                  padding: 10,
                  borderRadius: 10,
                  borderColor: COLORS.primary,
                  color: COLORS.primary,
                  textAlign: "center",
                }}
              >
               { selectedSubjectName==""?  'Select Subject' : selectedSubjectName}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            
            <View style={{ flex: 2 }}>
            <View style={styles.cardStyle}>
 
          <View>
            <View style={styles.optionsContainer}>
              <Text style={styles.optionsText}>Question</Text>
              <TextInput onChangeText={(value)=>{
                setquestion(value)}} style={styles.optionsInput}  />
            </View>
            <View style={styles.optionsContainer}>
              <Text style={styles.optionsText}>Option 1</Text>
              <TextInput onChangeText={value=>setOption1(value)} style={styles.optionsInput}  />
            </View>
            <View style={styles.optionsContainer}>
              <Text style={styles.optionsText}>Option 2</Text>
              <TextInput onChangeText={value=>setOption2(value)}  style={styles.optionsInput}  />
            </View>
            <View style={styles.optionsContainer}>
              <Text style={styles.optionsText}>Option 3</Text>
              <TextInput  onChangeText={value=>setOption3(value)} style={styles.optionsInput} />
            </View>
            <View style={styles.optionsContainer}>
              <Text style={styles.optionsText}>Option 4</Text>
              <TextInput onChangeText={value=>setOption4(value)} style={styles.optionsInput}  />
            </View>
            <View style={styles.optionsContainer}>
              <Text style={styles.optionsText}>Answer</Text>
              <TextInput onChangeText={value=>setAnswer(value)} style={styles.optionsInput}  />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={()=>{
                addQuestion()
              }}>
              <Text style={styles.button}>Add Question</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{
                navigation.goBack()
              }}>
              <Text style={[styles.button,{backgroundColor:COLORS.red}]}>Cancel</Text>
              </TouchableOpacity>

            </View>
          </View>

    </View>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
                      <TouchableOpacity
              onPress={() => {
                setSubjectModal(true);
              }}
            >
              <Text
                style={{
                  borderWidth: 1,
                  width: "80%",
                  alignSelf: "center",
                  marginVertical: 10,
                  fontSize: SIZES.h2,
                  padding: 10,
                  borderRadius: 10,
                  borderColor: COLORS.primary,
                  color: COLORS.primary,
                  textAlign: "center",
                }}
              >
                Select Subject
              </Text>
            </TouchableOpacity>
          <Text
            style={{
              width: 300,
              textAlign: "center",

              color: COLORS.primary,
              fontSize: SIZES.h2,
              margin: 0,
            }}
          >
            No Question...
          </Text>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={subjectModal}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {subjects?.map((item) => {
              return (
                <TouchableOpacity
                key={item.subject_id}
                  style={{ width: "70%", left: 20 }}
                  onPress={() => {
                    alert(item.subject_name + " Selected");
                    setSelectedSubject(item.subject_id);
                    setSelectedSubjectName(item.subject_name)
                    setSubjectModal(false);
                  }}
                >
                  <Text style={styles.modalText} key={item.subject_id}>
                    {item.subject_name}
                  </Text>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setSubjectModal(false)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddQuestions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  cardStyle: {
    marginVertical: 3,
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,

    margin: 10,
    //box Shaddow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    
    top: 10,
    marginVertical: 5,
  },
  optionsInput: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
    marginVertical: 2,
    width: "70%",
    textAlign: "center",
    fontSize: 12,
  },
  optionsText: {
    top: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,

    paddingVertical: 5,
    color: COLORS.white,
    borderRadius: 8,
    fontSize: 14,
  },
  modalView: {
    top: "50%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "80%",
    color: COLORS.white,
    borderRadius: 5,
  },
});
