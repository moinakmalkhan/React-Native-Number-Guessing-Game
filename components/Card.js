import React from "react";
import { StyleSheet, View } from "react-native";

const Card = (props) => {
  return <View style={{...styles.card,...props.style}}>{props.children}</View>
  
};

export default Card;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
