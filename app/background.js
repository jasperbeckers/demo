import React, { Component } from "react";
import { StyleSheet, ImageBackground } from "react-native";

class BackgroundImage extends Component {
  render() {
    return (
      <ImageBackground
        source={require("../assets/background.jpg")}
        style={styles.backgroundImage}
      >
        {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  }
});

export default BackgroundImage;
