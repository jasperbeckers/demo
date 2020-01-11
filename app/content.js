import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
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
          <View style={styles.center}>
            <View style={{ height: "20%" }} />
            <Image
              source={require("../assets/backpack.png")}
              style={{ width: 110, height: 110 }}
            />
            <Text style={styles.title}>Coming Soon!</Text>
            <Text style={styles.subtitle}>
              Your smart travel guide to anywhere.
            </Text>
          </View>
        </BackgroundImage>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
    flexDirection: "column"
  },
  appstyle: {
    flex: 1
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
