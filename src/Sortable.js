import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Text,
    PanResponder,
    LayoutAnimation
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconFA from "react-native-vector-icons/FontAwesome";

import Util from "./utils";

class Sortable extends Component {
    constructor() {
        super();
        this._width = Util.size.width / 3;
        this._topIndex = 0;
        this._leftIndex = 0;
        this._index = 0;
        this._finalTopIndex = 0;
        this._finalLeftIndex = 0;
        this._finalIndex = 0;
        this._prevTop = 0;
        this._prevLeft = 0;
        this._left = 0;
        this._top = 0;
        this._animation = {
            duration: 200,
            create: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity
            },
            update: {
                type: LayoutAnimation.Types.linear,
                springDamping: 0.7
            }
        };

        this.state = {
            selected: 14,
            days: [
                {
                    key: 0,
                    title: "A stopwatch",
                    isFA: false,
                    icon: "ios-stopwatch",
                    size: 48,
                    color: "#ff856c",
                    hideNav: false
                },
                {
                    key: 1,
                    title: "A weather app",
                    isFA: false,
                    icon: "ios-partly-sunny",
                    size: 60,
                    color: "#90bdc1",
                    hideNav: true
                },
                {
                    key: 2,
                    title: "twitter",
                    isFA: false,
                    icon: "logo-twitter",
                    size: 50,
                    color: "#2aa2ef",
                    hideNav: true
                },
                {
                    key: 3,
                    title: "cocoapods",
                    isFA: true,
                    icon: "contao",
                    size: 50,
                    color: "#FF9A05",
                    hideNav: false
                },
                {
                    key: 4,
                    title: "find my location",
                    isFA: false,
                    icon: "md-pin",
                    size: 50,
                    color: "#00D204",
                    hideNav: false
                },
                {
                    key: 5,
                    title: "Spotify",
                    isFA: true,
                    icon: "spotify",
                    size: 50,
                    color: "#777",
                    hideNav: true
                },
                {
                    key: 6,
                    title: "Moveable Circle",
                    isFA: false,
                    icon: "ios-baseball",
                    size: 50,
                    color: "#5e2a06",
                    hideNav: true
                },
                {
                    key: 7,
                    title: "Swipe Left Menu",
                    isFA: true,
                    icon: "google",
                    size: 50,
                    color: "#4285f4",
                    hideNav: true
                },
                {
                    key: 8,
                    title: "Twitter Parallax View",
                    isFA: true,
                    icon: "twitter-square",
                    size: 50,
                    color: "#2aa2ef",
                    hideNav: true
                },
                {
                    key: 9,
                    title: "Tumblr Menu",
                    isFA: false,
                    icon: "logo-tumblr",
                    size: 50,
                    color: "#37465c",
                    hideNav: true
                },
                {
                    key: 10,
                    title: "OpenGL",
                    isFA: false,
                    icon: "md-contrast",
                    size: 50,
                    color: "#2F3600",
                    hideNav: false
                },
                {
                    key: 11,
                    title: "charts",
                    isFA: false,
                    icon: "ios-stats",
                    size: 50,
                    color: "#fd8f9d",
                    hideNav: false
                },
                {
                    key: 12,
                    title: "tweet",
                    isFA: false,
                    icon: "md-chatboxes",
                    size: 50,
                    color: "#83709d",
                    hideNav: true
                },
                {
                    key: 13,
                    title: "tinder",
                    isFA: true,
                    icon: "fire",
                    size: 50,
                    color: "#ff6b6b",
                    hideNav: true
                },
                {
                    key: 14,
                    title: "Time picker",
                    isFA: false,
                    icon: "ios-calendar-outline",
                    size: 50,
                    color: "#ec240e",
                    hideNav: false
                }
            ]
        };
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                return gestureState.dx !== 0 || gestureState.dy !== 0;
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                const { pageX, pageY } = evt.nativeEvent;

                this._topIndex = Math.floor((pageY - 30) / this._width);
                this._leftIndex = Math.floor(pageX / this._width);
                this._index = this._topIndex * 3 + this._leftIndex;
                this._prevLeft = this._width * this._leftIndex;
                this._prevTop = this._width * this._topIndex;

                this.setState({
                    selected: this._index
                });

                let box = this.refs["box" + this._index];
                box.setNativeProps({
                    style: {
                        opacity: 0.7,
                        shadowColor: "#000",
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        shadowOffset: {
                            height: 0,
                            width: 2
                        }
                    }
                });
            },
            onPanResponderMove: (evt, gestureState) => {
                this._top = this._prevTop + gestureState.dy;
                this._left = this._prevLeft + gestureState.dx;

                let box = this.refs["box" + this._index];
                box.setNativeProps({
                    style: {
                        top: this._top,
                        left: this._left
                    }
                });

                this._endMove(evt, gestureState);
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestuerState) =>
                this._release(evt, gestuerState),
            onPanResponderTerminate: (evt, gestureState) =>
                this._release(evt, gestureState),
            onShouldBlockNativeResponder: (evt, gestureState) => true
        });
    }

    _endMove(evt, gestureState) {
        // Get final top and left indexes
        this._finalTopIndex = Math.floor(this._top / this._width + 0.5);
        this._finalLeftIndex = Math.floor(this._left / this._width + 0.5);

        // Validate index
        if (
            -1 < this._finalTopIndex &&
            this._finalTopIndex < 5 &&
            -1 < this._finalLeftIndex &&
            this._finalLeftIndex < 3
        ) {
            this._finalIndex = this._finalTopIndex * 3 + this._finalLeftIndex;
            let days = this.state.days;
            let movedBox = days[this._index];
            days.splice(this._index, 1);
            days.splice(this._finalIndex, 0, movedBox);

            this.setState({ days });

            if (this._finalIndex != this._index) {
                this._index = this._finalIndex;
                this.setState({
                    selected: this._finalIndex
                });
            }
        }
        LayoutAnimation.configureNext(this._animation);
    }

    _release(evt, gestureState) {
        const shadowStyle = {
            opacity: 1,
            shadowColor: "#000",
            shadowOpacity: 0,
            shadowRadius: 0,
            shadowOffset: {
                height: 0,
                width: 0
            }
        };
        // Validate index
        if (
            -1 < this._finalTopIndex &&
            this._finalTopIndex < 5 &&
            -1 < this._finalLeftIndex &&
            this._finalLeftIndex < 3
        ) {
            let box = this.refs["box" + this._finalIndex];
            let top = this._finalTopIndex * this._width;
            let left = this._finalLeftIndex * this._width;
            box.setNativeProps({
                style: { top, left, ...shadowStyle }
            });
        } else {
            let box = this.refs["box" + this._index];
            let top = this._topIndex * this._width;
            let left = this._leftIndex * this._width;
            box.setNativeProps({
                style: { top, left, ...shadowStyle }
            });
        }
        LayoutAnimation.configureNext(this.animations);
    }

    render() {
        const boxes = this.state.days.map((elem, index) => {
            let top = Math.floor(index / 3) * this._width;
            let left = (index % 3) * this._width;
            return (
                <View
                    {...this._panResponder.panHandlers}
                    ref={"box" + index}
                    key={elem.key}
                    style={[styles.touchBox, { top, left }]}
                    underlayColor="#eee"
                >
                    <View style={styles.boxContainer}>
                        <Text style={styles.boxText}>Day{index + 1}</Text>
                        {elem.isFA ? (
                            <IconFA
                                size={elem.size}
                                name={elem.icon}
                                style={[styles.boxIcon, { color: elem.color }]}
                            />
                        ) : (
                            <Icon
                                size={elem.size}
                                name={elem.icon}
                                style={[styles.boxIcon, { color: elem.color }]}
                            />
                        )}
                    </View>
                </View>
            );
        });

        let selectedItem = boxes[this.state.selected];
        boxes.splice(this.state.selected, 1);
        boxes.push(selectedItem);

        return <View style={styles.touchBoxContainer}>{boxes}</View>;
    }
}

export default Sortable;

const styles = StyleSheet.create({
    boxContainer: {
        width: Util.size.width / 3,
        height: Util.size.width / 3,
        justifyContent: "center",
        alignItems: "center"
    },
    boxText: {
        position: "absolute",
        bottom: 15,
        backgroundColor: "transparent"
    },
    boxIcon: {
        top: -10
    },
    touchBoxContainer: {
        marginTop: 30
    },
    touchBox: {
        position: "absolute",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc"
    }
});
