import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import qs from "qs";
import { SERVER_URL, GET_QUESTIOS } from "../../api/requests";
import Result from "../Results/Result";

const Quiz = ({ navigation ,route}) => {
  const{subject_id,count} = route.params
  const [quizData, setQuizData] = useState("");
  const [qIndex, setqIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [correct, setCorrect] = useState(count);
  const [finished, setfinished] = useState(false);

  const fetchQuiz = async () => {
    await axios({
      method: "post",
      url: `${SERVER_URL}${GET_QUESTIOS}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        subject_id,
      }),
    })
      .then((res) => {
        setQuizData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const nextHandler = () => {
    if (qIndex < quizData.length - 1) {
      setqIndex(qIndex + 1);
    } else {
      alert("Finished");
      setfinished(true);
    }
  };
  useEffect(() => {
    fetchQuiz();
  }, []);
  const checkCorrect = (option) => {
    if (option == quizData[qIndex].answer) {
      setCorrect(correct + 1);
      nextHandler();
    } else {
      nextHandler();
    }
  };
  return loading ? (
    <ActivityIndicator size={"large"} color={COLORS.primary} />
  ) : finished ? (
    <Result
      navigation={navigation}
      correct={correct}
      incorrect={quizData.length + 1 - correct}
      total={quizData.length + 1}
    />
  ) : (
    <View style={styles.container}>
      <Image
        source={require(".././../../assets/GCUWF.png")}
        style={styles.logoStyle}
      />
      <Text style={styles.questionTitle}>{quizData[qIndex]?.question}</Text>
      <View style={styles.optionBox}>
        <TouchableOpacity
          onPress={() => {
            checkCorrect(quizData[qIndex].option1);
          }}
        >
          <Text style={styles.options}>{quizData[qIndex].option1}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            checkCorrect(quizData[qIndex].option2);
          }}
        >
          <Text style={styles.options}>{quizData[qIndex].option2}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            checkCorrect(quizData[qIndex].option3);
          }}
        >
          <Text style={styles.options}>{quizData[qIndex].option3}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            checkCorrect(quizData[qIndex].option4);
          }}
        >
          <Text style={styles.options}>{quizData[qIndex].option4}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={nextHandler}>
          <Ionicons
            name="arrow-forward-circle"
            size={50}
            color={COLORS.primary}
            style={{
              alignSelf: "flex-end",
              marginTop: 50,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoStyle: {
    marginBottom: 20,
    width: 120,
    height: 120,
  },
  questionTitle: {
    fontSize: SIZES.h2,
    marginBottom: 50,
  },
  options: {
    color: "white",
    fontSize: SIZES.h3,
    borderRadius: 10,
    width: 300,
    paddingHorizontal: 30,
    textAlign: "center",
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    marginTop: 10,
    elevation: 2,
  },
});
