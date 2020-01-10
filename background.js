import React, { Component } from "react";
import { StyleSheet, ImageBackground } from "react-native";

class BackgroundImage extends Component {
  render() {
    return (
      <ImageBackground
        source={require("./background.jpg")}
        style={styles.backgroundImage}
      >
        {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%"
  }
});

export default BackgroundImage;
