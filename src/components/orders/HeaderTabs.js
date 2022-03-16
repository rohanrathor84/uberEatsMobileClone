import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import color from '../../resources/colors';

export default function HeaderTabs({name, showFilter}) {
  return (
    <View style={styles.mainContainer}>
      <Ionicons name="chevron-back" size={32} color={color.gray600} />
      <View style={styles.subContainer}>
        <Text style={styles.titleStyle}>{name}</Text>
        {showFilter ? (
          <FontAwesome5
            name="filter"
            size={16}
            style={styles.iconStyle}
            color={color.gray600}
          />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  subContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  titleStyle: {
    marginStart: 6,
    fontFamily: 'roboto.medium',
    fontSize: 16,
    color: color.gray600,
  },
  iconStyle: {marginEnd: 6},
});
