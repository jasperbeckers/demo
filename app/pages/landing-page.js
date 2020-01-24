import React, { Component } from "react";
import { StyleSheet, Text, View, Picker } from "react-native";
import BackgroundImage from "../background";
import MainButton from "../main-button";
import * as Font from "expo-font";
import Sortable from "../sortable/Sortable.js";

class Content extends Component {
  state = {
    durationValue: 3,
    locationValue: 11,
    plan: [],
    is_front_page: true,
    content_displaynames: [],
    content_ids: []
  };

  loadList() {
    fetch("http://localhost:8080//?request=list")
      .then(res => res.json())
      .then(response => {
        this.setState({
          content_displaynames: response.displaynames,
          content_ids: response.ids
        });
      });
  }

  componentDidMount() {
    Font.loadAsync({
      "roboto-thin": require("../../assets/fonts/Roboto-Thin.ttf")
    });
    this.loadList();
  }

  render() {
    return (
      <View style={styles.appstyle}>
        <BackgroundImage>
          <View style={styles.center}>
            <Sortable />
            <View style={{ height: "5%" }} />
            <Text style={styles.title}>What's around the corner?</Text>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <Text style={styles.subtitle}>Ideas for a </Text>
              <Picker
                selectedValue={this.state.durationValue}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ durationValue: itemValue })
                }
                mode={"dropdown"}
              >
                <Picker.Item label="1" />
                <Picker.Item label="2" />
                <Picker.Item label="3" />
                <Picker.Item label="4" />
                <Picker.Item label="5" />
                <Picker.Item label="6" />
                <Picker.Item label="7" />
              </Picker>
              <Text style={styles.subtitle}> day trip to </Text>
              <Text style={styles.subtitle} />
            </View>
            <MainButton />
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
    textAlign: "center",
    color: "black"
  }
});

export default Content;
