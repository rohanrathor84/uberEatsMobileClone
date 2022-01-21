import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';

const items = [
  {
    image: require('../../assets/images/shoppingBag.png'),
    text: 'Pick-up',
  },
  {
    image: require('../../assets/images/softDrink.png'),
    text: 'Soft Drinks',
  },
  {
    image: require('../../assets/images/bread.png'),
    text: 'Bakery Items',
  },
  {
    image: require('../../assets/images/fastFood.png'),
    text: 'Fast Foods',
  },
  {
    image: require('../../assets/images/deals.png'),
    text: 'Deals',
  },
  {
    image: require('../../assets/images/coffee.png'),
    text: 'Coffee & Tea',
  },
];

export default function Categories() {
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingStart: 15,
        marginTop: 5,
      }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {items.map((items, index) => (
          <View key={index} style={{alignItems: 'center', marginEnd: 30}}>
            <Image
              source={items.image}
              style={{
                width: 50,
                height: 40,
                resizeMode: 'contain',
              }}
            />
            <Text style={{fontSize: 13, fontWeight: '300'}}>{items.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
