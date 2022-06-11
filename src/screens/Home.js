import React, {PureComponent} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Modal,
  Text,
  BackHandler,
  Platform,
} from 'react-native';
import Categories from '../components/home/Categories';
import HeaderTabs from '../components/home/HeaderTabs';
import RestaurantItems from '../components/home/RestaurantItems';
import SearchBar from '../components/home/SearchBar';
import LoadingScreen from '../components/common/LoadingScreen';
import ErrorScreen from '../components/common/ErrorScreen';
import {checkNetworkConnected} from '../utilities/utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import color from '../resources/colors';
import LoginSignUp from './LoginSignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

const YELP_API_KEY =
  'iqof8CBHsusIWGQRaCBsdEese-EcxmsTcc-MOT-A5AskVV4nk1jfbIi-9-ESmx8CPxHoPq8PdwyQ9jzPynhifBK0sUeVbhu3CvXJlk-d8O5RxTNaAcS-HRv442RlYXYx';
export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      restaurantData: [],
      city: 'New york',
      activeTab: 'Delivery',
      isLoading: true,
      showErrorScreen: false,
      notFoundModalVisible: false,
      showLoginSignUpModal: false,
    };
  }

  getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${this.state.city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    checkNetworkConnected(async isConnected => {
      if (isConnected) {
        await fetch(yelpUrl, apiOptions)
          .then(res => res.json())
          .then(json => {
            if (json.businesses !== undefined) {
              this.setState({
                restaurantData:
                  this.state.activeTab === 'Near By'
                    ? json.businesses
                    : json.businesses.filter(business =>
                        business.transactions.includes(
                          this.state.activeTab.toLocaleLowerCase(),
                        ),
                      ),
                isLoading: false,
                showErrorScreen: false,
              });
            } else {
              this.setState({
                isLoading: false,
                showErrorScreen: true,
                notFoundModalVisible: true,
              });
            }
          })
          .catch(error => {
            this.setState({
              isLoading: false,
              showErrorScreen: true,
            });
          });
      } else {
        this.setState({
          isLoading: false,
          showErrorScreen: true,
        });
      }
    });
  };

  setActiveTab = text => {
    this.setState({
      activeTab: text,
      isLoading: true,
    });
  };

  setCity = city => {
    this.setState({
      city: city,
      isLoading: true,
    });
  };

  onRequestClose = () => {
    this.setState({
      notFoundModalVisible: false,
    });
  };

  onRequestLoginSignUpOpen = async () => {
    this.setState({
      showLoginSignUpModal:
        (await AsyncStorage.getItem('introSkiped')) === null ? true : false,
    });
  };

  onRequestLoginSignUpClose = () => {
    AsyncStorage.setItem('introSkiped', 'false');
    this.setState({
      showLoginSignUpModal: false,
    });
  };

  checkPermission = () => {
    request(
      (Platform.OS = 'android'
        ? PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
        : PERMISSIONS.IOS.LOCATION_ALWAYS),
    )
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        // …
      });
  };

  componentDidMount() {
    this.getRestaurantsFromYelp();
    // this.checkPermission();
    this.onRequestLoginSignUpOpen();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.activeTab !== this.state.activeTab ||
      prevState.city !== this.state.city
    ) {
      this.getRestaurantsFromYelp();
    }
  }

  // componentWillUnmount() {
  //   BackHandler.exitApp();
  // }

  render() {
    return (
      <SafeAreaView style={styles.mainContainerStyle}>
        <ListHeaderComponent
          activeTab={this.state.activeTab}
          setActiveTab={this.setActiveTab}
          setCity={this.setCity}
        />
        {this.state.isLoading ? (
          <LoadingScreen isLoading={this.state.isLoading} />
        ) : this.state.showErrorScreen ? (
          <ErrorScreen />
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
        <Modal
          visible={this.state.notFoundModalVisible}
          transparent={true}
          animationType={'fade'}
          onRequestClose={this.onRequestClose}>
          <View style={styles.modalMainContainer}>
            <View style={styles.notFoundViewStyle}>
              <Text numberOfLines={3} style={styles.msgTextStyle}>
                Currently, we are not providing any services at{' '}
                {this.state.city} location. Please try with other locations.
              </Text>
              <AntDesign
                name="close"
                size={14}
                color="#757575"
                style={styles.cancelBtnStyle}
                onPress={this.onRequestClose}
              />
            </View>
          </View>
        </Modal>
        <Modal
          visible={this.state.showLoginSignUpModal}
          animationType={'fade'}
          onRequestClose={this.onRequestLoginSignUpClose}>
          <LoginSignUp
            navigation={this.props.navigation}
            route={this.props.route}
            onRequestClose={this.onRequestLoginSignUpClose}
          />
        </Modal>
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
  modalMainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
  },
  notFoundViewStyle: {
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingStart: 16,
    paddingEnd: 38,
    borderRadius: 5,
  },
  cancelBtnStyle: {
    fontSize: 20,
    top: 12,
    right: 12,
    position: 'absolute',
    color: '#9e9e9e',
  },
  msgTextStyle: {
    fontSize: 15,
    fontFamily: 'roboto.regular',
    color: color.gray700,
  },
});
