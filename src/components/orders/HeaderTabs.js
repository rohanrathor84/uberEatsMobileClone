import React from 'react';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function HeaderTabs({name, showFilter}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 20,
        alignItems: 'center',
        marginHorizontal: 8,
      }}>
      <Ionicons name="chevron-back" size={32} />
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
        }}>
        <Text style={{marginStart: 6, fontWeight: '600', fontSize: 16}}>
          {name}
        </Text>
        {showFilter ? (
          <FontAwesome5 name="filter" size={16} style={{marginEnd: 6}} />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
