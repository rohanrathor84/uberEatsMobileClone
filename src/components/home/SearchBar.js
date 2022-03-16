import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import color from '../../resources/colors';
// import Entypo from "react-native-vector-icons/Entypo";

export default function SearchBar({cityHandler}) {
  // const [textInput, setTextInput] = useState("");
  return (
    <View style={styles.mainContainer}>
      <GooglePlacesAutocomplete
        query={{key: 'AIzaSyACEzzlQmCCmWnAc3yWeAqYU0sTDI-ga30'}}
        onPress={(data, details = null) => {
          console.log(data.description);
          const city = data.description.split(',')[0];
          cityHandler(city);
        }}
        placeholder="Search"
        styles={{
          textInput: {
            backgroundColor: color.gray200,
            borderRadius: 20,
            fontFamily: 'roboto.regular',
            marginTop: 7,
            color: color.gray600,
            fontSize: 15,
          },
          textInputContainer: {
            backgroundColor: color.gray200,
            borderRadius: 50,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          },
        }}
        enablePoweredByContainer={false}
        // textInputProps={{
        //   clearButtonMode: "never",
        //   onChangeText: (text) => {
        //     setTextInput(text);
        //   },
        //   value: textInput,
        // }}
        renderLeftButton={() => (
          <View style={styles.leftBtnStyle}>
            <Ionicons name="location-sharp" size={24} />
          </View>
        )}
        renderRightButton={() => (
          <View style={styles.rightBtnStyle}>
            {/* {textInput.length > 0 ? (
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  marginEnd: 5,
                }}
                onPress={() => {
                  setTextInput("");
                }}
              >
                <Entypo name="circle-with-cross" />
              </TouchableOpacity>
            ) : null} */}
            <View style={styles.rightContainerStyle}>
              <AntDesign
                name="clockcircle"
                size={12}
                style={styles.clockIconStyle}
              />
              <Text style={styles.searchTextStyle}>Search</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {marginTop: 15, flexDirection: 'row'},
  leftBtnStyle: {marginStart: 10},
  rightBtnStyle: {flexDirection: 'row'},
  rightContainerStyle: {
    flexDirection: 'row',
    marginEnd: 8,
    backgroundColor: 'white',
    padding: 9,
    borderRadius: 30,
    alignItems: 'center',
  },
  searchTextStyle: {
    color: color.gray600,
    fontFamily: 'roboto.regular',
    fontSize: 15,
  },
  clockIconStyle: {marginEnd: 6},
});
