import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import BackgroundImage from "./background";

class Content extends Component {
  render() {
    return (
      <View style={styles.appstyle}>
        <BackgroundImage>
          <View Viewstyle={styles.textstyle}>
            <Text style={styles.title}>Coming Soon!</Text>
          </View>
        </BackgroundImage>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textstyle: {
    alignItems: "center",
    justifyContent: "center"
  },
  appstyle: {
    flex: 1,
    backgroundColor: "whitesmoke"
  },
  title: {
    fontWeight: "bold",
    fontSize: 48,
    fontFamily: "Helvetica",
    marginVertical: 16,
    textAlign: "center",
    color: "green"
  }
});

export default Content;
