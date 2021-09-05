import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import colors from "../constants/colors";
import DefaultStyles from "../constants/Default-Styles";

const GameOver = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Game Over!</Text>
      <View style={styles.imageContainer}>
        <Image
          //   source={{uri:"https://avatars.githubusercontent.com/u/34204623?v=4"}}
          source={require("../assets/success.png")}
          style={styles.successImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>

        <Text style={{ ...DefaultStyles.bodyText,...styles.textContainer }}>
            Your phone needed <Text style={styles.highlightText}>{props.totalRounds}</Text> round(s) to guess the
            number <Text style={styles.highlightText}>{props.numberWas}</Text>
        </Text>
        <CustomButton onPress={props.onNewGame.bind(this, 0)} >NEW GAME</CustomButton>
      </View>
    </View>
  );
};

export default GameOver;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 10,
  },
  resultContainer: {
      width:"80%"
  },
  textContainer: {
      marginVertical: 10,
      fontSize:18,
      textAlign: "center"
  },
  highlightText:{
      color:colors.primary,
  }
  ,
  successImage: {
    width: "100%",
    height: "100%",
  },
});
