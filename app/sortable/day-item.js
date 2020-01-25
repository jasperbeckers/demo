import React, { Component } from "react";
import { View, ImageBackground, StyleSheet, Text } from "react-native";
import update from "immutability-helper";
import SlotItem from "./slot-item";
import { DropTarget } from "react-dnd";
import FadeInView from "../fade-in-view";
import ColorGradient from "../color-gradient";

class DayItem extends Component {
  state = {
    plan: this.props.list,
    highlight: false
  };

  getMostViewedItem() {
    var max_ratings = 0;
    var max_item = 0;
    for (var i = 0; i < this.state.plan.length; i++) {
      if (
        this.state.plan[i].item != null &&
        this.state.plan[i].item.rating_count !== ""
      ) {
        var ratings = Number(this.state.plan[i].item.rating_count);
        if (ratings > max_ratings) {
          max_ratings = ratings;
          max_item = i;
        }
      }
    }
    return max_item;
  }

  getCardImage() {
    var p = this.getMostViewedItem();
    return "https://smart-itinerary.s3-eu-west-1.amazonaws.com/images/".concat(
      this.state.plan[p].item.image
    );
  }

  openImageURL() {
    window.open(this.getCardImage());
  }

  onMouseEnter = () => {
    this.setState({ highlight: true });
  };

  onMouseLeave = () => {
    this.setState({ highlight: false });
  };

  render() {
    const isActive = this.props.canDrop && this.props.isOver;

    const backgroundColor = isActive ? "lightgreen" : "#FFF";

    return this.props.connectDropTarget(
      <div>
        <View
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          activeOpacity={1.0}
        >
          <FadeInView
            duration={300}
            delay={this.props.id * 150}
            ref={this.fadeinview}
          >
            <View
              style={this.state.highlight ? styles.card_highlight : styles.card}
            >
              <ImageBackground
                source={{
                  uri: this.getCardImage()
                }}
                style={styles.image}
                imageStyle={styles.imageStyle}
              >
                <View
                  style={{
                    height: 250,
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  {this.state.highlight && (
                    <View
                      style={{ flexDirection: "row-reverse", width: 350 }}
                    />
                  )}
                  <View />
                  <View>
                    <ColorGradient
                      style={styles.gradientStyle}
                      colors={[
                        "rgba(256,256,256,0.0)",
                        "rgba(256,256,256,1.0)"
                      ]}
                    >
                      <Text style={styles.dayText}>{`DAY ${this.props.id +
                        1}`}</Text>
                    </ColorGradient>
                  </View>
                </View>
              </ImageBackground>
              {this.state.plan.map((item, i) => {
                return (
                  <SlotItem
                    key={item.id}
                    index={i}
                    listId={this.props.id}
                    length={this.state.plan.length}
                    card={item}
                    removeCard={this.removeCard.bind(this)}
                    moveCard={this.moveCard.bind(this)}
                  />
                );
              })}
            </View>
          </FadeInView>
        </View>
      </div>
    );
  }

  removeCard(index) {
    this.setState(
      update(this.state, {
        plan: {
          $splice: [[index, 1]]
        }
      })
    );
  }

  moveCard(dragIndex, hoverIndex) {
    const dragCard = this.state.plan[dragIndex];

    this.setState(
      update(this.state, {
        plan: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    );
  }

  pushCard(card) {
    this.setState(
      update(this.state, {
        plan: {
          $push: [card]
        }
      })
    );
  }
}

const styles = StyleSheet.create({
  card: {
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
    zIndex: -1
  },

  card_highlight: {
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
    zIndex: -1
  },

  image: {
    width: 350,
    height: 250,

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 6
  },

  gradientStyle: {
    height: 110,
    width: 350,
    justifyContent: "flex-end"
  },

  imageStyle: {
    borderRadius: 6
  },

  dayText: {
    marginLeft: 3,
    marginBottom: 2,
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  }
});

const cardTarget = {
  drop(props, monitor, component) {
    const { id } = props;
    const sourceObj = monitor.getItem();
    if (id !== sourceObj.listId) component.pushCard(sourceObj.card);
    return {
      listId: id
    };
  }
};

export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(DayItem);
