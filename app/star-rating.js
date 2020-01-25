import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

class Rating extends React.Component {
  render() {
    return (
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{`${this.props.rating}`}</Text>
        <Image style={styles.icon} source={require("../assets/star.png")} />
      </View>
      //<Text style={styles.ratingCountText}>({`${this.props.ratingcount}`})</Text>
    );
  }
}

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  icon: {
    width: 15,
    height: 15
  },
  ratingText: {
    fontSize: 12,
    textTransform: "capitalize",
    color: "#ECA026"
  },
  ratingCountText: {
    fontSize: 12,
    textTransform: "capitalize",
    color: "grey"
  }
});

export default Rating;
