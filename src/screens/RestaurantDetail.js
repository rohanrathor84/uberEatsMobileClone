import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import About from '../components/restaurantDetail/About';
import MenuItems, {foods} from '../components/restaurantDetail/MenuItems';
import ViewCart from '../components/restaurantDetail/ViewCart';

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
          <View style={{backgroundColor: '#eeeeee'}}>
            <About route={route} />
            <View style={styles.lineSeparator} />
          </View>
        }
        ListFooterComponent={
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 20,
            }}>
            <View style={{height: 1, width: 80, backgroundColor: '#bdbdbd'}} />
            <Text
              style={{
                marginHorizontal: 10,
                maxWidth: 150,
                textAlign: 'center',
              }}>
              The End.
            </Text>
            <View style={{height: 1, width: 80, backgroundColor: '#bdbdbd'}} />
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
    backgroundColor: '#bdbdbd',
    marginTop: 20,
  },
});
