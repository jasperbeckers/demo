import React from "react";
import { View, StyleSheet } from "react-native";
import Content from "./app/content";

export default function App() {
  return (
    <View style={styles.app}>
      <Content />
    </View>
  );
}
const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "whitesmoke"
  }
});
