import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import color from '../../resources/colors';

export default function ({activeTab, setActiveTab}) {
  // const [activeTab, setActiveTab] = useState("Delivery");
  return (
    <View style={styles.header}>
      <HeaderButton
        text="Near By"
        btnColor={color.white}
        textColor={color.black}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <HeaderButton
        text="Delivery"
        btnColor={color.black}
        textColor={color.white}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <HeaderButton
        text="Pickup"
        btnColor={color.white}
        textColor={color.black}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </View>
  );
}

const HeaderButton = ({activeTab, setActiveTab, text}) => (
  <TouchableOpacity
    style={[
      styles.headerButton,
      {backgroundColor: activeTab === text ? color.black : color.white},
    ]}
    onPress={() => setActiveTab(text)}>
    <Text
      style={[
        styles.headerText,
        {color: activeTab === text ? color.white : color.black},
      ]}>
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  headerButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  headerText: {
    fontSize: 15,
    fontFamily: 'roboto.medium',
  },
});
