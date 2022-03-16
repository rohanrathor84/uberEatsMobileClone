import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import color from '../../resources/colors';

export default function OrderItem({item}) {
  const {title, price} = item;
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleStyle}>{title}</Text>
      <Text style={styles.priceStyle}>{price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: color.gray99,
  },
  titleStyle: {
    fontFamily: 'roboto.regular',
    fontSize: 16,
    color: color.gray700,
  },
  priceStyle: {
    fontFamily: 'roboto.regular',
    fontSize: 16,
    color: color.gray700,
  },
});
