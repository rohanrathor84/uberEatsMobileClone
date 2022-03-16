import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import color from '../../resources/colors';

const ErrorScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <AnimatedLottieView
        style={styles.iconStyle}
        source={require('../../assets/animations/something-went-wrong.json')}
        autoPlay={true}
      />
      <Pressable style={styles.btnStyle}>
        <Text style={styles.btnTextStyle}>TRY AGAIN</Text>
      </Pressable>
    </View>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({
  mainContainer: {alignItems: 'center', justifyContent: 'center'},
  iconStyle: {
    height: 350,
  },
  btnStyle: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: color.orangeE7,
    top: '-20%',
  },
  btnTextStyle: {
    color: color.white,
    fontFamily: 'roboto.regular',
    fontSize: 14,
  },
});
