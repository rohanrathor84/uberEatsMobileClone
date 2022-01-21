import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useDispatch, useSelector} from 'react-redux';

const screenWidth = Dimensions.get('screen').width;

export const foods = [
  {
    id: 'MenuItem-0001',
    title: 'Lasagna',
    description: 'With butter lettuce, tomato and sauce bechamel',
    price: '$13.50',
    image:
      'https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg',
  },
  {
    id: 'MenuItem-0002',
    title: 'Tandoori Chicken',
    description:
      'Amazing Indian dish with tenderloin chicken off the sizzles 🔥',
    price: '$19.20',
    image: 'https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg',
  },
  {
    id: 'MenuItem-0003',
    title: 'Chilaquiles',
    description:
      'Chilaquiles with cheese and sauce. A delicious mexican dish 🇲🇽',
    price: '$14.50',
    image:
      'https://i2.wp.com/chilipeppermadness.com/wp-content/uploads/2020/11/Chilaquales-Recipe-Chilaquiles-Rojos-1.jpg',
  },
  {
    id: 'MenuItem-0004',
    title: 'Chicken Caesar Salad',
    description:
      'One can never go wrong with a chicken caesar salad. Healthy option with greens and proteins!',
    price: '$21.50',
    image:
      'https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da',
  },
  {
    id: 'MenuItem-0005',
    title: 'Lasagna',
    description: 'With butter lettuce, tomato and sauce bechamel',
    price: '$13.50',
    image:
      'https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg',
  },
];

export default function MenuItems({
  restaurantName,
  restaurantImage,
  item,
  index,
  foods,
  hideCheckbox,
}) {
  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...item,
        restaurantName: restaurantName,
        restaurantImage: restaurantImage,
        checkboxValue: checkboxValue,
      },
    });
  };

  const cartItems = useSelector(state => state.cartReducer.selectedItems.items);

  const isFoodInCart = (food, cartItems) =>
    Boolean(cartItems.find(item => item.id === food.id));

  return (
    <View key={index}>
      <View style={styles.menuItemStyle}>
        {hideCheckbox ? (
          <></>
        ) : (
          <BouncyCheckbox
            iconStyle={{borderColor: 'lightgray', borderRadius: 5}}
            fillColor="green"
            onPress={checkboxValue => {
              selectItem(item, checkboxValue);
            }}
            isChecked={isFoodInCart(item, cartItems)}
          />
        )}
        <FoodInfo food={item} />
        <FoodImage food={item} />
      </View>
      {foods.length - 1 != index ? <View style={styles.lineSeparator} /> : null}
    </View>
  );
}

const FoodInfo = ({food: {title, description, price}}) => (
  <View style={{flex: 1, justifyContent: 'space-evenly'}}>
    <Text style={styles.titleStyle}>{title}</Text>
    <Text>{description}</Text>
    <Text>{price}</Text>
  </View>
);

const FoodImage = ({food: {image}}) => (
  <View style={{marginStart: 8}}>
    <Image
      source={{uri: image}}
      style={{width: 100, height: 100, borderRadius: 8}}
    />
  </View>
);

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
  },
  titleStyle: {
    fontSize: 19,
    fontWeight: '600',
  },
  lineSeparator: {
    height: 0.5,
    backgroundColor: '#bdbdbd',
    marginHorizontal: 20,
  },
});
