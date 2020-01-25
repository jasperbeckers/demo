import React, { Component } from "react";
import { StyleSheet, Text, View, Picker, ScrollView } from "react-native";
import BackgroundImage from "../background";
import MainButton from "../main-button";
import * as Font from "expo-font";
import DayGrid from "../sortable/day-grid.js";
import Select from "react-select";

class Content extends Component {
  state = {
    durationValue: 3,
    selected_location_id: "99ftX",
    plan: [],
    is_front_page: true,
    content_displaynames: [],
    content_ids: [],
    content_options: [],
    selected: null,
    latitude: 48.86,
    longitude: 2.34
  };

  loadList() {
    fetch("http://localhost:8080//?request=list")
      .then(res => res.json())
      .then(response => {
        this.setState({
          content_city_displaynames: response.city_displaynames,
          content_country_displaynames: response.country_displaynames,
          content_ids: response.ids
        });
        var options = [];
        for (var i = 0; i < this.state.content_city_displaynames.length; i++) {
          options.push({
            value: this.state.content_ids[i],
            label: this.state.content_city_displaynames[i].concat(
              ", ",
              this.state.content_country_displaynames[i]
            )
          });
        }
        this.setState({
          content_options: options
        });
      });
  }

  loadItinerary(query) {
    fetch(query)
      .then(res => res.json())
      .then(response => {
        this.setState({
          plan: response,
          is_front_page: false,
          latitude: response[0][0]["item"]["lat"],
          longitude: response[0][0]["item"]["lng"]
        });
      });
  }

  onButtonPressed = () => {
    this.setState({
      plan: []
    });
    this.query = "http://localhost:8080//?request=itinerary".concat(
      "&days=",
      this.state.durationValue,
      "&id=",
      this.state.selected_location_id
    );
    this.loadItinerary(this.query);
  };

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
          <ScrollView noScroll={true} style={styles.container}>
            <View style={styles.center}>
              <View style={{ height: "5%" }} />
              <Text style={styles.title}>What's around the corner?</Text>

              <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", alignContent: "center", marginVertical: 10 }}>
                <Text style={styles.text}>Ideas for a </Text>
                <View style={{ width: 70, zIndex: 100 }}>
                  <Select
                    styles={selectstyles}
                    onChange={e => this.setState({ durationValue: e.value })}
                    placeholder={"3"}
                    options={[
                      { value: 1, label: 1 },
                      { value: 2, label: 2 },
                      { value: 3, label: 3 },
                      { value: 4, label: 4 },
                      { value: 5, label: 5 },
                      { value: 6, label: 6 }
                    ]}
                  />
                </View>
                <Text style={styles.text}> day trip to </Text>
                <View style={{ width: 300, zIndex: 100 }}>
                  <Select
                    styles={selectstyles}
                    onChange={e =>
                      this.setState({ selected_location_id: e.value })
                    }
                    placeholder={"try: Antalya, Turkey"}
                    options={this.state.content_options}
                  />
                </View>
              </View>
              <Text style={styles.text}>More options</Text>
              <MainButton onPress={this.onButtonPressed} />
              <DayGrid plan={this.state.plan} />
            </View>
          </ScrollView>
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
  },
  text: {
    lineHeight: 3,
    fontSize: 16,
    marginVertical: 16,
    textAlign: "center"
  }
});

const selectstyles = {
  control: (base, state) => ({
    ...base,
    fontFamily: "Arial",
    zIndex: 999,
    borderColor: state.isFocused ? "green" : base.borderColor,
    "&:hover": {
      borderColor: state.isFocused ? "green" : base.borderColor
    }
  }),
  menu: base => ({
    ...base,
    fontFamily: "Arial",
    zIndex: 999
  }),
  container: base => ({
    ...base,
    zIndex: 999
  })
};

export default Content;
