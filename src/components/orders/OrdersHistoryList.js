import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import color from '../../resources/colors';

export default function OrderHistory({
  item,
  index,
  runningOrderSize,
  navigation,
}) {
  return (
    <View style={styles.mainContainer}>
      {item.status <= 5 && index === 0 ? (
        <View style={styles.runningStatusStyle}>
          <Text style={styles.nowTextStyle}>Now</Text>
          <View style={styles.runningOrderSizeStyle}>
            <Text style={styles.orderSizeTextStyle}>{runningOrderSize}</Text>
          </View>
        </View>
      ) : (
        <></>
      )}

      {index === runningOrderSize ? (
        <Text style={styles.pastTextStyle}>Past</Text>
      ) : (
        <></>
      )}

      <TouchableOpacity
        style={styles.orderDetailContainer}
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('OrderDetail', {
            restaurantName: item.restaurantName,
            items: item,
          });
        }}>
        <Text style={styles.headerTextStyle}>
          {item.restaurantName} order on {item.orderOn}
        </Text>
        <View style={styles.dividerStyle} />
        <View style={styles.orderDetailSubContainer}>
          <Image
            source={{
              uri: item.restaurantImage,
            }}
            style={styles.restaurantImageStyle}
          />
          <View style={styles.restaurantDetailContainer}>
            <Text style={styles.restaurantNameStyle}>
              {item.restaurantName}
            </Text>
            <Text style={styles.restaurantPriceStyle}>{item.total}</Text>
            <Text style={styles.orderMsgText} numberOfLines={1}>
              {item.status === 1
                ? 'Order Placed'
                : item.status === 2
                ? 'Delivery guy on the way to pickup your order'
                : item.status === 3
                ? 'Delivery guy waiting at restaurant'
                : item.status === 4
                ? 'Delivery guy on the way'
                : item.status === 5
                ? 'Delivery guy waiting at your doorstep'
                : item.status === 6
                ? 'Delivered'
                : 'Canceled'}
            </Text>
          </View>
        </View>
        <View style={styles.animationContainer}>
          {item.status === 1 ? (
            <AnimatedLottieView
              style={styles.animationStyle}
              source={require('../../assets/animations/delivery-guy-order-pickup.json')}
              autoPlay={true}
              speed={0.5}
              loop={true}
            />
          ) : item.status === 2 ? (
            <AnimatedLottieView
              style={styles.animationStyle}
              source={require('../../assets/animations/delivery-guy-order-pickup.json')}
              autoPlay={true}
              speed={0.5}
              loop={true}
            />
          ) : item.status === 3 ? (
            <AnimatedLottieView
              style={styles.animationStyle}
              source={require('../../assets/animations/delivery-guy-waiting.json')}
              autoPlay={true}
              speed={0.5}
              loop={true}
            />
          ) : item.status === 4 ? (
            <AnimatedLottieView
              style={styles.animationStyle}
              source={require('../../assets/animations/delivery-guy-out-for-delivery.json')}
              autoPlay={true}
              speed={0.5}
              loop={true}
            />
          ) : item.status === 5 ? (
            <AnimatedLottieView
              style={styles.animationStyle}
              source={require('../../assets/animations/delivery-guy-waiting-at-the-doorstep.json')}
              autoPlay={true}
              speed={0.5}
              loop={true}
            />
          ) : (
            <></>
          )}
          {/* <AnimatedLottieView
            style={{height: 200}}
            source={
              item.status == 1
                ? require('../../assets/animations/delivery-guy-order-pickup.json')
                : item.status == 2
                ? require('../../assets/animations/delivery-guy-order-pickup.json')
                : item.status == 3
                ? require('../../assets/animations/delivery-guy-waiting.json')
                : item.status == 4
                ? require('../../assets/animations/delivery-guy-out-for-delivery.json')
                : item.status == 5
                ? require('../../assets/animations/delivery-guy-waiting-at-the-doorstep.json')
                : ''
            }
            autoPlay={true}
            speed={0.5}
            loop={true}
          /> */}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {margin: 16},
  runningStatusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nowTextStyle: {fontSize: 16, fontWeight: '800', color: 'black'},
  runningOrderSizeStyle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: '#89CFF0',
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 4,
  },
  orderSizeTextStyle: {color: 'white'},
  pastTextStyle: {fontSize: 16, fontWeight: '800', color: 'black'},
  orderDetailContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 6,
    shadowColor: '#bdbdbd',
    marginTop: 16,
  },
  headerTextStyle: {
    paddingVertical: 6,
    marginHorizontal: 16,
    color: color.gray500,
  },
  dividerStyle: {height: 1, width: '100%', backgroundColor: color.gray200},
  orderDetailSubContainer: {flexDirection: 'row'},
  restaurantImageStyle: {height: 50, width: 50, borderRadius: 6, margin: 16},
  restaurantDetailContainer: {justifyContent: 'center', flex: 1, marginEnd: 6},
  restaurantNameStyle: {color: color.gray800, fontWeight: '600'},
  restaurantPriceStyle: {color: color.gray700, fontWeight: '500'},
  orderMsgText: {color: color.gray500, fontWeight: '400'},
  animationContainer: {alignItems: 'center'},
  animationStyle: {height: 200},
});
