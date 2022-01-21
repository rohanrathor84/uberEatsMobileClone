import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import color from '../../resources/colors';

export default function OrderHistory({
  item,
  index,
  runningOrderSize,
  navigation,
}) {
  return (
    <View style={{margin: 16}}>
      {item.status <= 5 && index == 0 ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, fontWeight: '800', color: 'black'}}>
            Now
          </Text>
          <View
            style={{
              height: 16,
              width: 16,
              borderRadius: 8,
              backgroundColor: '#89CFF0',
              justifyContent: 'center',
              alignItems: 'center',
              marginStart: 4,
            }}>
            <Text style={{color: 'white'}}>{runningOrderSize}</Text>
          </View>
        </View>
      ) : (
        <></>
      )}

      {index == runningOrderSize ? (
        <Text style={{fontSize: 16, fontWeight: '800', color: 'black'}}>
          Past
        </Text>
      ) : (
        <></>
      )}

      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          borderRadius: 5,
          elevation: 6,
          shadowColor: '#bdbdbd',
          marginTop: 16,
        }}
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('OrderDetail', {
            restaurantName: item.restaurantName,
            items: item,
          });
        }}>
        <Text
          style={{
            paddingVertical: 6,
            marginHorizontal: 16,
            color: color.gray500,
          }}>
          {item.restaurantName} order on {item.orderOn}
        </Text>
        <View
          style={{height: 1, width: '100%', backgroundColor: color.gray200}}
        />
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{
              uri: item.restaurantImage,
            }}
            style={{height: 50, width: 50, borderRadius: 6, margin: 16}}
          />
          <View style={{justifyContent: 'center', flex: 1, marginEnd: 6}}>
            <Text style={{color: color.gray800, fontWeight: '600'}}>
              {item.restaurantName}
            </Text>
            <Text style={{color: color.gray700, fontWeight: '500'}}>
              {item.total}
            </Text>
            <Text
              style={{color: color.gray500, fontWeight: '400'}}
              numberOfLines={1}>
              {item.status == 1
                ? 'Order Placed'
                : item.status == 2
                ? 'Delivery guy on the way to pickup your order'
                : item.status == 3
                ? 'Delivery guy waiting at restaurant'
                : item.status == 4
                ? 'Delivery guy on the way'
                : item.status == 5
                ? 'Delivery guy waiting at your doorstep'
                : item.status == 6
                ? 'Delivered'
                : 'Canceled'}
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          {item.status == 1 ? (
            <AnimatedLottieView
              style={{height: 200}}
              source={require('../../assets/animations/delivery-guy-order-pickup.json')}
              autoPlay={true}
              speed={0.5}
              loop={true}
            />
          ) : item.status == 2 ? (
            <AnimatedLottieView
              style={{height: 200}}
              source={require('../../assets/animations/delivery-guy-order-pickup.json')}
              autoPlay={true}
              speed={0.5}
              loop={true}
            />
          ) : item.status == 3 ? (
            <AnimatedLottieView
              style={{height: 200}}
              source={require('../../assets/animations/delivery-guy-waiting.json')}
              autoPlay={true}
              speed={0.5}
              loop={true}
            />
          ) : item.status == 4 ? (
            <AnimatedLottieView
              style={{height: 200}}
              source={require('../../assets/animations/delivery-guy-out-for-delivery.json')}
              autoPlay={true}
              speed={0.5}
              loop={true}
            />
          ) : item.status == 5 ? (
            <AnimatedLottieView
              style={{height: 200}}
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
