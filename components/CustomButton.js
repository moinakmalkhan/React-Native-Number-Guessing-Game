import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../constants/colors";

const CustomButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
    button:{
        backgroundColor: colors.primary,
        paddingVertical:12,
        paddingHorizontal:30,
        borderRadius:25,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 7,
    },
    buttonText:{
        color: "white",
        fontFamily:"open-sans",
        fontSize:18,
        textAlign: "center"
    }
});
