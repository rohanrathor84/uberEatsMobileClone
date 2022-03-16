import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../../resources/colors';

export const localRestaurants = [
  {
    name: 'Beachside Bar',
    image_url:
      'https://www.teahub.io/photos/full/171-1718121_high-resolution-restaurant-images-hd.jpg',
    categories: ['Cafe', 'Bar'],
    price: '$$',
    reviews: 1244,
    rating: 4.5,
  },
  {
    name: 'Benihana',
    image_url:
      'https://www.elitetraveler.com/wp-content/uploads/2021/06/FSX-0164-Filia-main-e1623861643989.jpg',
    categories: ['Cafe', 'Bar'],
    price: '$$',
    reviews: 2444,
    rating: 3.7,
  },
  {
    name: 'Indian Grill',
    image_url:
      'https://assets.gqindia.com/photos/5cdc74897813c415f22fc949/master/pass/cafe-mozaic.png',
    categories: ['Indian', 'Bar'],
    price: '$$',
    reviews: 1594,
    rating: 4.5,
  },
  {
    name: 'Moginies',
    image_url: 'https://wallpaperaccess.com/full/3014596.jpg',
    categories: ['Cafe', 'Bar', 'Bakery'],
    price: '$$',
    reviews: 5521,
    rating: 4.9,
  },
];
export default function RestaurantItems({restaurantData, index, navigation}) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.mainContainer}
      onPress={() =>
        navigation.navigate('RestaurantDetail', {
          name: restaurantData.name,
          image: restaurantData.image_url,
          price: restaurantData.price,
          reviews: restaurantData.review_count,
          rating: restaurantData.rating,
          categories: restaurantData.categories,
        })
      }>
      <View key={index} style={styles.headerStyle}>
        <RestaurantImage image={restaurantData.image_url} />
        <RestaurantInfo
          name={restaurantData.name}
          rating={restaurantData.rating}
        />
      </View>
    </TouchableOpacity>
  );
}

const RestaurantImage = ({image}) => {
  return (
    <>
      <Image
        source={{
          uri: image,
        }}
        style={styles.imageStyle}
      />
      <TouchableOpacity style={styles.wishListStyle}>
        <MaterialCommunityIcons
          name="heart-outline"
          size={25}
          color={color.white}
        />
      </TouchableOpacity>
    </>
  );
};

const RestaurantInfo = ({name, rating}) => (
  <View style={styles.titleStyle}>
    <View>
      <Text style={styles.titleTextStyle}>{name}</Text>
      <Text style={styles.titleSubTextStyle}>30-45 • min</Text>
    </View>
    <View style={styles.ratingStyle}>
      <Text>{rating}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {marginBottom: 10},
  headerStyle: {marginTop: 10, padding: 15, backgroundColor: color.white},
  imageStyle: {width: '100%', height: 180},
  wishListStyle: {position: 'absolute', right: 20, top: 20},
  titleStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  titleTextStyle: {
    fontSize: 15,
    fontFamily: 'roboto.medium',
    color: color.gray800,
  },
  titleSubTextStyle: {
    fontSize: 13,
    fontFamily: 'roboto.regular',
    color: color.gray600,
  },
  ratingStyle: {
    backgroundColor: color.gray200,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
});
