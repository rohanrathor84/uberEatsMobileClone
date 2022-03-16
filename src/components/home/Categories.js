import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import color from '../../resources/colors';

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
    <View style={styles.mainContainer}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={item.image} style={styles.imageStyle} />
            <Text style={styles.titleStyle}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: color.white,
    paddingVertical: 10,
    paddingStart: 15,
    marginTop: 5,
  },
  imageContainer: {alignItems: 'center', marginEnd: 30},
  imageStyle: {
    width: 50,
    height: 40,
    resizeMode: 'contain',
  },
  titleStyle: {fontSize: 13, fontFamily: 'roboto.regular', color: color.black},
});
