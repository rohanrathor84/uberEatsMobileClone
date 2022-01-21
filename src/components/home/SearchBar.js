import React from 'react';
import {View, Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Entypo from "react-native-vector-icons/Entypo";

export default function SearchBar({cityHandler}) {
  // const [textInput, setTextInput] = useState("");
  return (
    <View style={{marginTop: 15, flexDirection: 'row'}}>
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
            backgroundColor: '#eeeeee',
            borderRadius: 20,
            fontWeight: '700',
            marginTop: 7,
          },
          textInputContainer: {
            backgroundColor: '#eeeeee',
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
          <View style={{marginStart: 10}}>
            <Ionicons name="location-sharp" size={24} />
          </View>
        )}
        renderRightButton={() => (
          <View style={{flexDirection: 'row'}}>
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
            <View
              style={{
                flexDirection: 'row',
                marginEnd: 8,
                backgroundColor: 'white',
                padding: 9,
                borderRadius: 30,
                alignItems: 'center',
              }}>
              <AntDesign name="clockcircle" size={11} style={{marginEnd: 6}} />
              <Text>Search</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
