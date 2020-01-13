import React, { Component } from "react";
import { StyleSheet, Text, View, Picker } from "react-native";
import BackgroundImage from "../background";
import MainButton from "../main-button";
import * as Font from "expo-font";
import SortableGrid from "react-native-sortable-grid";
import { DraggableGrid } from "react-native-draggable-grid";

class Content extends Component {
  state = {
    durationValue: 3,
    locationValue: 11,
    plan: [],
    is_front_page: true,
    content_displaynames: [],
    content_ids: [],
    data: [
      { name: "1", key: "one" },
      { name: "2", key: "two" },
      { name: "3", key: "three" },
      { name: "4", key: "four" },
      { name: "5", key: "five" },
      { name: "6", key: "six" },
      { name: "7", key: "seven" },
      { name: "8", key: "eight" },
      { name: "9", key: "night" },
      { name: "0", key: "zero" }
    ]
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

  render_item(item: { name: string, key: string }) {
    return (
      <View style={styles.item} key={item.key}>
        <Text style={styles.item_text}>{item.name}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.appstyle}>
        <BackgroundImage>
          <View style={styles.center}>
            <View style={{ width: 100, height: 100, backgroundColor: "red" }}>
              <SortableGrid>
                {["a", "b", "c"].map((letter, index) => (
                  <View style={{ backgroundColor: "yellow" }} key={index}>
                    <Text>{letter}</Text>
                  </View>
                ))}
              </SortableGrid>
            </View>
            <View style={{ height: "5%" }} />
            <View style={{ width: 100, height: 100, backgroundColor: "red" }}>
              <DraggableGrid
                numColumns={4}
                renderItem={this.render_item}
                data={this.state.data}
              />
            </View>
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
