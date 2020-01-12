import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Content from "./app/pages/coming-soon-page";

class App extends Component {
  render() {
    return (
      <View style={styles.app}>
        <Content />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "whitesmoke"
  }
});

export default App;
