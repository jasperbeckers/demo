import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import flow from "lodash/flow";
import Rating from "../star-rating";

class SlotItem extends Component {
  state = {
    highlight: false
  };

  onMouseEnter = () => {
    this.setState({ highlight: true });
  };

  onMouseLeave = () => {
    this.setState({ highlight: false });
  };

  isLast() {
    return this.props.index === this.props.length - 1;
  }

  render() {
    //const opacity = this.props.isDragging ? 0 : 1;

    if (this.props.card.item == null) {
      return this.props.connectDragSource(
        this.props.connectDropTarget(
          <div>
            <View style={styles.container}>
              <Text style={styles.itemText}>Free time!</Text>
            </View>
          </div>
        )
      );
    }

    return this.props.connectDragSource(
      this.props.connectDropTarget(
        <div>
          <View
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onPress={this.onMouseEnter}
            activeOpacity={1.0}
          >
            <View
              style={[
                this.state.highlight
                  ? styles.container_highlight
                  : styles.container,
                this.isLast() ? styles.container_last : {}
              ]}
            >
              <View style={styles.sentenceStyle}>
                <Text style={styles.descriptionText}>{`${
                  this.props.card.description
                }`}</Text>
                <Text style={styles.itemText}>{`${
                  this.props.card.item.name
                }`}</Text>
              </View>
              <Rating
                rating={this.props.card.item.rating}
                ratingcount={this.props.card.item.rating_count}
              />
            </View>
          </View>
        </div>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 30,
    padding: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(256,256,256,1.0)"
  },
  container_highlight: {
    width: 350,
    height: 30,
    padding: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(240,240,240,1.0)"
  },
  container_last: {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  },
  sentenceStyle: {
    flexDirection: "row"
  },
  descriptionText: {
    fontSize: 15,
    textTransform: "capitalize",
    color: "black"
  },
  itemText: {
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "black"
  }
});

const cardSource = {
  beginDrag(props) {
    return {
      index: props.index,
      listId: props.listId,
      card: props.card
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult && dropResult.listId !== item.listId) {
      props.removeCard(item.index);
    }
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const sourceListId = monitor.getItem().listId;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    if (props.listId === sourceListId) {
      props.moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    }
  }
};

export default flow(
  DropTarget("CARD", cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource("CARD", cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(SlotItem);
