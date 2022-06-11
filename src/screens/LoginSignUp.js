import AnimatedLottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import color from '../resources/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default function LoginSignUp({navigation, route, onRequestClose}) {
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '604332474544-24rs6ioau9oe4h7djccphru38lhbl1r9.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
    return () => {};
  }, []);

  const onPress = async () => {
    onRequestClose();
    // navigation.navigate('BottomTabScreens');
    // if ((await AsyncStorage.getItem('introSkiped')) === null) {
    //   await AsyncStorage.setItem('introSkiped', 'true');
    // }
  };

  const googleBtnPress = () => {
    console.log('googleBtnPress!');
    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(userInfo => {
              console.log(JSON.stringify(userInfo));
            })
            .catch(e => {
              console.log('ERROR IS: ' + JSON.stringify(e));
            });
        }
      })
      .catch(e => {
        console.log('ERROR IS: ' + JSON.stringify(e));
      });
  };
  return (
    <View style={styles.mainContainer}>
      <AnimatedLottieView
        style={styles.userProfileStyle}
        source={require('../assets/animations/user-profile.json')}
        autoPlay={true}
        loop={true}
      />

      <Text style={styles.signUpMsg}>
        Sign-Up now and never gets hungry again!
      </Text>
      <View style={styles.buttonViewStyle}>
        <Pressable style={styles.googleBtnViewStyle} onPress={googleBtnPress}>
          <AnimatedLottieView
            style={styles.iconStyle}
            source={require('../assets/animations/google.json')}
            autoPlay={true}
            loop={true}
          />
          <Text style={styles.btnTextStyle}>Google Sign-Up</Text>
        </Pressable>

        <Pressable style={styles.facebookBtnViewStyle}>
          <AnimatedLottieView
            style={styles.iconStyle}
            source={require('../assets/animations/facebook.json')}
            autoPlay={true}
            loop={true}
          />
          <Text style={styles.btnTextStyle}>Facebook Sign-Up</Text>
        </Pressable>
      </View>

      <View style={styles.footerViewStyle}>
        <Text style={styles.orTextStyle}>or</Text>
        <Text
          style={styles.signInTextStyle}
          onPress={() => {
            setShowSignIn(true);
          }}>
          Sign-In instead
        </Text>

        <Text style={styles.tAndcStyle}>
          By continuing, you are agreeing to our Terms and Conditions.
        </Text>
      </View>

      {route.name !== 'AccountScreen' ? (
        <Pressable style={styles.skipViewStyle} onPress={onPress}>
          <Text style={styles.skipText}>Skip</Text>
          <Ionicons name="chevron-forward" size={16} color={color.gray600} />
        </Pressable>
      ) : (
        <></>
      )}

      <Modal
        visible={showSignIn}
        animationType={'slide'}
        transparent={true}
        onRequestClose={() => setShowSignIn(false)}>
        <View style={styles.modalMainContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              setShowSignIn(false);
            }}>
            <View style={styles.feedBackBtn} />
          </TouchableWithoutFeedback>
          <View style={styles.btnViewStyle}>
            <Pressable
              style={styles.googleBtnViewStyle}
              onPress={googleBtnPress}>
              <AnimatedLottieView
                style={styles.iconStyle}
                source={require('../assets/animations/google.json')}
                autoPlay={true}
                loop={true}
              />
              <Text style={styles.btnTextStyle}>Google Sign-In</Text>
            </Pressable>

            <Pressable style={styles.facebookBtnViewStyle}>
              <AnimatedLottieView
                style={styles.iconStyle}
                source={require('../assets/animations/facebook.json')}
                autoPlay={true}
                loop={true}
              />
              <Text style={styles.btnTextStyle}>Facebook Sign-In</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1, justifyContent: 'flex-end'},
  userProfileStyle: {alignSelf: 'center', marginBottom: 80, height: 200},
  signUpMsg: {
    alignSelf: 'center',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'roboto.regular',
    color: color.gray600,
  },
  buttonViewStyle: {marginHorizontal: 20},
  googleBtnViewStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 6,
  },
  iconStyle: {height: 40},
  btnTextStyle: {
    marginStart: 30,
    fontFamily: 'roboto.regular',
    color: color.gray800,
    fontSize: 14,
  },
  facebookBtnViewStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    elevation: 6,
  },
  footerViewStyle: {marginVertical: 30, alignSelf: 'center'},
  orTextStyle: {
    marginHorizontal: 5,
    textAlign: 'center',
    fontFamily: 'roboto.regular',
    color: color.gray600,
    fontSize: 14,
  },
  signInTextStyle: {
    marginTop: 6,
    textAlign: 'center',
    fontFamily: 'roboto.regular',
    color: color.gray600,
    fontSize: 14,
  },
  tAndcStyle: {
    marginTop: 10,
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.899,
    fontFamily: 'roboto.regular',
    color: color.gray600,
    fontSize: 14,
  },
  modalMainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#0000008A',
  },
  feedBackBtn: {flex: 1},
  btnViewStyle: {backgroundColor: '#bdbdbd', padding: 20},
  skipViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 24,
  },
  skipText: {
    fontSize: 16,
    color: color.gray600,
    fontFamily: 'roboto.regular',
  },
});
