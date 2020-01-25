import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import WebView from "react-native-web-webview";
import FadeInView from "../fade-in-view";

class BookingAd extends Component {
  state = {
    highlight: false
  };

  onMouseEnter = () => {
    this.setState({ highlight: true });
  };

  onMouseLeave = () => {
    this.setState({ highlight: false });
  };

  render() {
    if (this.props.show) {
      return (
        <TouchableOpacity
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          activeOpacity={1.0}
        >
          <FadeInView duration={300} delay={this.props.nr * 150}>
            <View
              style={this.state.highlight ? styles.card_highlight : styles.card}
            >
              <WebView
                originWhitelist={["*"]}
                scalesPageToFit={true}
                bounces={false}
                scrollEnabled={false}
                style={{ position: "absolute", top: 20, left: -50, right: 20 }}
                source={{ html: require("./booking-ad-widget.html") }}
              />
            </View>
          </FadeInView>
        </TouchableOpacity>
      );
    }
    return <View />;
  }
}

const styles = StyleSheet.create({
  card: {
    width: 350,
    height: 430,

    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
    borderRadius: 6,

    backgroundColor: "whitesmoke"
  },
  card_highlight: {
    width: 350,
    height: 430,

    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.8,
    borderRadius: 6,

    backgroundColor: "whitesmoke"
  }
});

export default BookingAd;
