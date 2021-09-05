// import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from "expo-font";
// import { AppLoading } from "expo";
import AppLoading from 'expo-app-loading';

const loadFont = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return (
        <AppLoading
          startAsync={loadFont}
          onFinish={() => setDataLoaded(true)}
          onError={console.warn}
        />
    );
  }
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };
  const onNewGame = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };
  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };
  let content = <StartGameScreen onStartGame={startGameHandler} />;
  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        totalRounds={guessRounds}
        numberWas={userNumber}
        onNewGame={onNewGame}
      />
    );
  }
  return (
    <View style={styles.screen}>
      <Header>Guess a number</Header>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
