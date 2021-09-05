import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../components/Card";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/colors";
import DefaultStyles from "../constants/Default-Styles";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectNumber, setSelectNumber] = useState();

  const numberInputHandler = (val) => {
    setEnteredValue(val.replace(/[^0-9]/g, ""));
  };
  const resetButtonHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
    setSelectNumber();
  };
  const confirmButtonHandler = () => {
    const selectedNumber = parseInt(enteredValue);
    if (!selectedNumber || selectedNumber <= 0 || selectedNumber > 99) {
      Alert.alert(
        "Invalid number",
        "Number has to be a number between 1 and 99",
        [{ text: "Okay", style: " 10`", onPress: resetButtonHandler }]
      );
      return;
    }
    setConfirmed(true);
    setSelectNumber(selectedNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };
  let confirmOutput;
  if (confirmed) {
    confirmOutput = (
      <Card style={styles.confirmCard}>
        <Text>You selected</Text>
        <NumberContainer>{selectNumber}</NumberContainer>
        <CustomButton
          onPress={() => props.onStartGame(selectNumber)}
        >START GAME</CustomButton>
      </Card>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <Text style={{ ...DefaultStyles.title, marginVertical: 10 }}>
          Start a New Game!
        </Text>
        <Card style={styles.inputContainer}>
          <Text style={DefaultStyles.bodyText}>Select a number</Text>
          <Input
            style={styles.textInputField}
            autoCapitalize="none"
            blurOnSubmit={true}
            autoCorrect={false}
            keyboardType="numeric"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmButtonHandler}
                color={Colors.primary}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetButtonHandler}
                color={Colors.secondary}
              />
            </View>
          </View>
        </Card>
        {confirmOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  button: {
    width: "40%",
  },
  textInputField: {
    padding: 4,
    width: "30%",
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  confirmCard: {
    marginTop: 20,
    alignItems: "center",
  },
});
