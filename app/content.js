import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import BackgroundImage from "./background";
import * as Font from "expo-font";

class Content extends Component {
  componentDidMount() {
    Font.loadAsync({
      "roboto-thin": require("../assets/fonts/Roboto-Thin.ttf")
    });
  }

  render() {
    return (
      <View style={styles.appstyle}>
        <BackgroundImage>
          <View Viewstyle={styles.textstyle}>
            <Text style={styles.title}>Coming Soon!</Text>
            <Text style={styles.subtitle}>Your travel guide to anywhere</Text>
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
    fontFamily: "roboto-thin",
    marginVertical: 16,
    textAlign: "center",
    color: "black"
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "roboto-thin",
    marginVertical: 16,
    textAlign: "center",
    color: "black"
  }
});

export default Content;
