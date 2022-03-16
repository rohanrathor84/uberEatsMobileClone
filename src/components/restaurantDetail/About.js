import React from 'react';
import {View, Text, Image, StatusBar, StyleSheet} from 'react-native';
import color from '../../resources/colors';

export default function About(props) {
  const {name, image, price, reviews, rating, categories} = props.route.params;

  const formattedCategories = categories.map(cat => cat.title).join(' • ');

  const description = `${formattedCategories} ${
    price ? ' • ' + price : ''
  } • 🎫 • ${rating} ⭐ (${reviews}+)`;

  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor={color.black}
        barStyle={'light-content'}
        showHideTransition={'fade'}
        hidden={false}
      />
      <RestaurantImage image={image} />
      <RestaurantName name={name} />
      <RestaurantDescription description={description} />
    </View>
  );
}

const RestaurantImage = ({image}) => (
  <Image source={{uri: image}} style={styles.restaurantImageStyle} />
);

const RestaurantName = ({name}) => (
  <Text style={styles.restaurantNameStyle}>{name}</Text>
);

const RestaurantDescription = ({description}) => (
  <Text style={styles.restaurantDetailStyle}>{description}</Text>
);

const styles = StyleSheet.create({
  restaurantImageStyle: {width: '100%', height: 200},
  restaurantNameStyle: {
    fontSize: 28,
    fontFamily: 'roboto.medium',
    color: color.black,
    marginTop: 10,
    marginHorizontal: 15,
  },
  restaurantDetailStyle: {
    marginTop: 10,
    marginHorizontal: 15,
    fontFamily: 'roboto.medium',
    color: color.gray800,
    fontSize: 15.5,
  },
});
