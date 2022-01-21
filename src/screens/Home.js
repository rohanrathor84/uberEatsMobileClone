import React, {useEffect, useState, PureComponent} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  BackHandler,
} from 'react-native';
import Categories from '../components/home/Categories';
import HeaderTabs from '../components/home/HeaderTabs';
import RestaurantItems, {
  localRestaurants,
} from '../components/home/RestaurantItems';
import SearchBar from '../components/home/SearchBar';
import LottieView from 'lottie-react-native';

const YELP_API_KEY =
  'iqof8CBHsusIWGQRaCBsdEese-EcxmsTcc-MOT-A5AskVV4nk1jfbIi-9-ESmx8CPxHoPq8PdwyQ9jzPynhifBK0sUeVbhu3CvXJlk-d8O5RxTNaAcS-HRv442RlYXYx';

// export default function Home({navigation}) {
//   const [restaurantData, setRestaurantData] = useState(localRestaurants);
//   const [city, setCity] = useState('San Francisco');
//   const [activeTab, setActiveTab] = useState('Delivery');

//   const getRestaurantsFromYelp = async () => {
//     const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

//     const apiOptions = {
//       headers: {
//         Authorization: `Bearer ${YELP_API_KEY}`,
//       },
//     };

//     return await fetch(yelpUrl, apiOptions)
//       .then(res => res.json())
//       .then(json => {
//         // console.log(JSON.stringify(json));
//         setRestaurantData(
//           json.businesses.filter(business =>
//             business.transactions.includes(activeTab.toLocaleLowerCase()),
//           ),
//         );
//       })
//       .catch(error => {
//         console.log('Found error: ' + error);
//       });
//   };

//   useEffect(() => {
//     getRestaurantsFromYelp();
//     return () => {
//       // cleanup
//       // setRestaurantData(localRestaurants);
//       // setActiveTab('Delivery');
//       // setCity('San Francisco');
//     };
//   }, [city, activeTab]);

//   return (
//     <SafeAreaView style={styles.mainContainerStyle}>
//       <View>
//         <ListHeaderComponent
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           setCity={setCity}
//         />
//       </View>
//       <FlatList
//         data={restaurantData}
//         keyExtractor={(item, index) => index.toString()}
//         showsVerticalScrollIndicator={false}
//         renderItem={({item, index}) => (
//           <RestaurantItems
//             restaurantData={item}
//             index={index}
//             navigation={navigation}
//           />
//         )}
//       />
//     </SafeAreaView>
//   );
// }

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      restaurantData: [],
      city: 'New york',
      activeTab: 'Delivery',
      isLoading: true,
    };
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  getRestaurantsFromYelp = async () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${this.state.city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return await fetch(yelpUrl, apiOptions)
      .then(res => res.json())
      .then(json => {
        // console.log(JSON.stringify(json));
        this.setState({
          restaurantData: json.businesses.filter(business =>
            business.transactions.includes(
              this.state.activeTab.toLocaleLowerCase(),
            ),
          ),
          isLoading: false,
        });
      })
      .catch(error => {
        console.log('Found error: ' + error);
        this.setState({
          isLoading: false,
        });
      });
  };

  setActiveTab = text => {
    console.log('setActiveTab: ' + text);
    this.setState({
      activeTab: text,
      isLoading: true,
    });
  };

  setCity = city => {
    console.log('setCity: ' + city);
    this.setState({
      city: city,
      isLoading: true,
    });
  };

  // handleBackButtonClick() {
  //   this.props.navigation.goBack(null);
  //   return true;
  // }

  componentDidMount() {
    // BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   this.handleBackButtonClick,
    // );
    this.getRestaurantsFromYelp();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.activeTab != this.state.activeTab ||
      prevState.city != this.state.city
    ) {
      console.log('componentDidUpdate setActiveTab: ' + this.state.activeTab);
      console.log('componentDidUpdate setCity: ' + this.state.city);
      this.getRestaurantsFromYelp();
    }
  }

  componentWillUnmount() {
    console.log(
      'componentWillUnmount: ' + JSON.stringify(this.props.navigation),
    );
    // BackHandler.removeEventListener(
    //   'hardwareBackPress',
    //   this.handleBackButtonClick,
    // );
  }

  render() {
    return (
      <SafeAreaView style={styles.mainContainerStyle}>
        <View>
          <ListHeaderComponent
            activeTab={this.state.activeTab}
            setActiveTab={this.setActiveTab}
            setCity={this.setCity}
          />
        </View>
        {this.state.isLoading ? (
          <View style={{alignItems: 'center'}}>
            <LottieView
              style={{height: 100}}
              source={require('../assets/animations/hamburger-loading.json')}
              autoPlay={true}
              speed={3}
              loop={this.state.isLoading}
            />
          </View>
        ) : (
          <FlatList
            data={this.state.restaurantData}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <RestaurantItems
                restaurantData={item}
                index={index}
                navigation={this.props.navigation}
              />
            )}
          />
        )}
      </SafeAreaView>
    );
  }
}

const ListHeaderComponent = ({activeTab, setActiveTab, setCity}) => {
  return (
    <View style={styles.listHeaderComponentMainStyle}>
      <View style={styles.listHeaderSubComponentStyle}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <Categories />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainerStyle: {
    backgroundColor: '#eeeeee',
    flex: 1,
  },
  listHeaderComponentMainStyle: {
    backgroundColor: '#eeeeee',
  },
  listHeaderSubComponentStyle: {
    backgroundColor: 'white',
    padding: 15,
  },
});
