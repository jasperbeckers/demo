import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

class MainButton extends React.Component {
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
    return (
      <TouchableOpacity
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={this.state.highlight ? styles.button_highlight : styles.button}
        onPress={this.props.onPress}
      >
        <Image
          style={styles.logo}
          source={require("../assets/backpack-white.png")}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    height: 55,
    width: 55
  },
  button: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: "#008000",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 15,
    paddingTop: 15,
    paddingLeft: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    zIndex: -1
  },
  button_highlight: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: "#008c00",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 15,
    paddingTop: 15,
    paddingLeft: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.6,
    shadowRadius: 7,
    zIndex: -1
  }
});

export default MainButton;
