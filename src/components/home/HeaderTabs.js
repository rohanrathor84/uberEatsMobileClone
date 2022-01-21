import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

export default function ({activeTab, setActiveTab}) {
  // const [activeTab, setActiveTab] = useState("Delivery");
  return (
    <View style={styles.header}>
      <HeaderButton
        text="Delivery"
        btnColor="black"
        textColor="white"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <HeaderButton
        text="Pickup"
        btnColor="white"
        textColor="black"
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
      {backgroundColor: activeTab === text ? 'black' : 'white'},
    ]}
    onPress={() => setActiveTab(text)}>
    <Text
      style={
        (styles.headerText, {color: activeTab === text ? 'white' : 'black'})
      }>
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
    fontWeight: '900',
  },
});
