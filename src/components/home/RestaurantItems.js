import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
      style={{marginBottom: 10}}
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
      <View
        key={index}
        style={{marginTop: 10, padding: 15, backgroundColor: 'white'}}>
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
        style={{width: '100%', height: 180}}
      />
      <TouchableOpacity style={{position: 'absolute', right: 20, top: 20}}>
        <MaterialCommunityIcons
          name="heart-outline"
          size={25}
          color="#ffffff"
        />
      </TouchableOpacity>
    </>
  );
};

const RestaurantInfo = ({name, rating}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    }}>
    <View>
      <Text style={{fontSize: 15, fontWeight: 'bold'}}>{name}</Text>
      <Text style={{fontSize: 13, color: 'gray'}}>30-45 • min</Text>
    </View>
    <View
      style={{
        backgroundColor: '#eeeeee',
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
      }}>
      <Text>{rating}</Text>
    </View>
  </View>
);
