import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import DefaultStyles from "../constants/Default-Styles";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
const generateRandomNumberBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomNumberBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const GameScreen = (props) => {
  var currentLow = useRef(0);
  var currentHigh = useRef(100);
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomNumberBetween(
      currentLow.current,
      currentHigh.current,
      props.userChoice
    )
  );
  const { userChoice, onGameOver } = props;
  const [pastGuesses, setPastGuesses] = useState([currentGuess]);
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [onGameOver, currentGuess, userChoice]);
  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "grater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const num = generateRandomNumberBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setPastGuesses((r) => [num, ...r]);
    setCurrentGuess(num);
  };
  const renderListItems = (value,numOfRounds) => (
    <View key={value} style={styles.listItem}>
      <Text style={DefaultStyles.bodyText}>#{numOfRounds}</Text>
      <Text style={DefaultStyles.bodyText}>{value}</Text>
    </View>
  );
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <CustomButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} />
        </CustomButton>
        <CustomButton onPress={nextGuessHandler.bind(this, "grater")}>
          <Ionicons name="md-add" color="white" size={24} />
        </CustomButton>
      </Card>
      <View style={styles.listContainer}>

      <ScrollView contentContainerStyle={styles.listRoot}>
        {pastGuesses.map((guess,index) => renderListItems(guess,pastGuesses.length-index))}
      </ScrollView>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "85%",
  },
  listContainer: {
    width:"80%",
    flex: 1,
  },
  listRoot:{
    alignItems: "center",
    flexGrow:1,
    justifyContent:"flex-end"
  },
  listItem:{
    borderColor:"#ccc",
    borderWidth:1,
    justifyContent: "space-between",
    borderRadius:25,
    padding: 15,
    marginVertical:10,
    backgroundColor:"#fff",
    flexDirection: "row",
    width:"60%",

  },
});
