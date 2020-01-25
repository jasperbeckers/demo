import React, { Component } from "react";
import { View } from "react-native";
import Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DayItem from "./day-item";
import BookingAd from "../booking-ad/booking-ad"

class Sortable extends Component {
  render() {
    return (
      <DndProvider backend={Backend}>
        <View style={{ zIndex: -1 }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "flex-start"
            }}
          >
            {this.props.plan.map((list, index) => {
              return <DayItem id={index} list={list} key={index} />;
            })}
            <BookingAd
             show={this.props.plan.length > 0}
             nr={this.props.plan.length}
            />
          </View>
        </View>
      </DndProvider>
    );

  }
}

export default Sortable;
