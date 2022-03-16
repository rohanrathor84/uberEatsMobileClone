import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import color from '../../resources/colors';
import HeaderTabs from './HeaderTabs';

export default function OrderDetail({route}) {
  return (
    <View style={styles.mainContainer}>
      <HeaderTabs name={route.params.restaurantName} showFilter={false} />
      <FlatList
        data={route.params.items.items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={<RenderItem />}
      />
    </View>
  );
}

const RenderItem = ({item, index}) => {
  return <Text>{item.title}</Text>;
};

const styles = StyleSheet.create({
  mainContainer: {backgroundColor: color.white, flex: 1},
});
