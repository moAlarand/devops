import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Animated, StatusBar } from 'react-native';
import {
  Circle, Svg
} from 'react-native-svg';

import Reanimated, { Easing } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';


interface Props {
}

const {
  interpolate,
  timing,
  block,
  set,
  startClock,
  Value,
  clockRunning,
  Clock,
  cond,
  stopClock,
  multiply,
  color
} = Reanimated;

const AnimatedCircle = Reanimated.createAnimatedComponent(Circle);

export default class App extends Component<Props> {



  runTiming = (value = 0, dest = 1) => {
    const clock = new Clock();
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = {
      duration: 50000,
      toValue: new Value(0),
      easing: Easing.inOut(Easing.ease),
    };

    return block([
      cond(clockRunning(clock), [
        set(config.toValue, dest),
      ], [
          set(state.finished, 0),
          set(state.time, 0),
          set(state.position, value),
          set(state.frameTime, 0),
          set(config.toValue, dest),
          startClock(clock),
        ]),
      timing(clock, state, config),
      cond(state.finished, stopClock(clock)),
      state.position,
    ]);
  }






  render() {


    const stroke = interpolate(this.runTiming(), {
      inputRange: [0, 1],
      outputRange: [0, Math.PI * 2]
    });
    const offset = multiply(stroke, 1000);



    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000000'
        }}
      >

        {/* <LinearGradient
          start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
          locations={[0.2,0.5,0.7]}
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.linearGradient}
        >
          <Text
            style={styles.buttonText}
          >
            Sign in with Facebook
          </Text>

        </LinearGradient> */}


        <Svg
        width="90%"
        height="90%"      
        style={styles.container}
        >
          <AnimatedCircle
            cx="50%"
            cy="50%"
            r="20%"
            stroke='green'
            strokeWidth="60"
            fill="#000000"
            strokeDashoffset={offset}
            strokeDasharray={[1]}
          />
        </Svg>
      </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
  },
  linearGradient: {
    // flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});