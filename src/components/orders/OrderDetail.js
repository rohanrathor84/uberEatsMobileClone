import React from 'react';
import {View, Text, FlatList} from 'react-native';
import HeaderTabs from './HeaderTabs';

export default function OrderDetail({route}) {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
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
