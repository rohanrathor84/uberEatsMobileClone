import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import color from '../resources/colors';

const data = [
  {
    icon: require('../assets/animations/orders.json'),
    name: 'Orders',
    brief: 'Check your order status',
  },
  {
    icon: require('../assets/animations/help-center.json'),
    name: 'Help Center',
    brief: 'Help regarding your recent purchases',
  },
  {
    icon: require('../assets/animations/crown2.json'),
    name: 'Gold User',
    brief: 'Coupons, offers & rewards await you',
  },
  {
    icon: require('../assets/animations/wishlist.json'),
    name: 'Wishlist',
    brief: 'Your most loved dishes',
  },
  {
    icon: require('../assets/animations/share.json'),
    name: 'Refer & Earn',
    brief: 'Invite friends and earn rewards',
  },
  {
    icon: require('../assets/animations/profile.json'),
    name: 'Profile Details',
    brief: 'Change your profile details and password',
  },
  {
    icon: require('../assets/animations/address.json'),
    name: 'Address',
    brief: 'Save addresses for a hassle-free checkout',
  },
  {
    icon: require('../assets/animations/saved.json'),
    name: 'Save Cards',
    brief: 'Save your cards for faster checkout',
  },
  {
    icon: require('../assets/animations/settings.json'),
    name: 'Settings',
    brief: 'Manage notification & app settings',
  },
];

export default function Account() {
  const RenderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.renderItemViewStyle}>
        <AnimatedLottieView
          style={styles.iconStyle}
          source={item.icon}
          autoPlay={true}
          loop={false}
        />
        <View style={styles.itemTextViewStyle}>
          <Text style={styles.titleStyle}>{item.name}</Text>
          <Text style={styles.subTitleStyle}>{item.brief}</Text>
        </View>
        <AntDesign
          name="right"
          size={14}
          color={color.gray700}
          style={styles.rightIconStyle}
        />
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.userProfileStyle}>
        <Image
          source={require('../assets/images/profile.jpg')}
          style={styles.userImgStyle}
          resizeMode={'contain'}
        />
        <View style={styles.userDetailViewStyle}>
          <Text style={styles.userNameStyle}>Rohan Kumar</Text>
          <View style={styles.userSubDetailStyleView}>
            <AnimatedLottieView
              style={styles.crownIconStyle}
              source={require('../assets/animations/crown1.json')}
              autoPlay={true}
              loop={false}
            />
            <Text style={styles.userSubDetail}>Gold User!</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.accountItemsViewStyle}>
          {data.map((item, index) => {
            return <RenderItem item={item} index={index} key={index} />;
          })}
          <View style={styles.footerViewStyle}>
            <Text style={styles.footerTextStyle}>FAQs</Text>
            <Text style={styles.footerTextStyle}>ABOUT US</Text>
            <Text style={styles.footerTextStyle}>TEARMS OF USE</Text>
            <Text style={styles.footerTextStyle}>PRIVACY POLICY</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  userProfileStyle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  userImgStyle: {height: 80, width: 80, borderRadius: 5},
  userDetailViewStyle: {marginStart: 20},
  userNameStyle: {
    fontSize: 22,
    fontFamily: 'roboto.medium',
    color: color.gray800,
  },
  userSubDetail: {
    fontSize: 13,
    fontFamily: 'roboto.regular',
    color: color.gray600,
  },
  userSubDetailStyleView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 6,
  },
  crownIconStyle: {height: 30, marginLeft: -5, marginBottom: -5},
  accountItemsViewStyle: {marginTop: 20},
  footerViewStyle: {
    backgroundColor: 'white',
    marginTop: 20,
  },
  footerTextStyle: {
    paddingVertical: 20,
    paddingStart: '15%',
    fontSize: 13,
    fontFamily: 'roboto.medium',
    color: color.gray700,
  },
  renderItemViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    padding: 10,
  },
  iconStyle: {height: 40},
  itemTextViewStyle: {marginStart: 8},
  titleStyle: {fontSize: 15, fontFamily: 'roboto.medium', color: color.gray700},
  subTitleStyle: {
    fontSize: 11,
    fontFamily: 'roboto.regular',
    color: color.gray500,
  },
  rightIconStyle: {position: 'absolute', right: 20},
});
