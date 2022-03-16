import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const LoadingScreen = ({isLoading}) => {
  return (
    <View style={styles.mainContinerStyle}>
      <AnimatedLottieView
        style={styles.iconStyle}
        source={require('../../assets/animations/hamburger-loading.json')}
        autoPlay={true}
        speed={3}
        loop={isLoading}
      />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  mainContinerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {height: 100},
});
