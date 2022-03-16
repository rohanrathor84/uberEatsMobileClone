import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import About from '../components/restaurantDetail/About';
import MenuItems, {foods} from '../components/restaurantDetail/MenuItems';
import ViewCart from '../components/restaurantDetail/ViewCart';
import color from '../resources/colors';

export default function RestaurantDetail({route, navigation}) {
  return (
    <View>
      <FlatList
        data={foods}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <MenuItems
            restaurantName={route.params.name}
            restaurantImage={route.params.image}
            item={item}
            index={index}
            foods={foods}
            hideCheckbox={false}
          />
        )}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        removeClippedSubviews={false}
        ListHeaderComponent={
          <View style={styles.headerStyle}>
            <About route={route} />
            <View style={styles.lineSeparator} />
          </View>
        }
        ListFooterComponent={
          <View style={styles.footerContainerStyle}>
            <View style={styles.lineStyle} />
            <Text style={styles.endTextStyle}>The End.</Text>
            <View style={styles.lineStyle} />
          </View>
        }
      />
      <ViewCart navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  lineSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: color.gray400,
    marginTop: 20,
  },
  headerStyle: {backgroundColor: color.gray200},
  footerContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  lineStyle: {height: 1, width: 80, backgroundColor: color.gray600},
  endTextStyle: {
    marginHorizontal: 10,
    maxWidth: 150,
    textAlign: 'center',
    fontFamily: 'roboto.regular',
    color: color.gray600,
  },
});
