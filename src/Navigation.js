import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import RestaurantDetail from './screens/RestaurantDetail';
import {Provider as ReduxProvider} from 'react-redux';
import configureStore from './redux/store';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Browse from './screens/Browse';
import Grocery from './screens/Grocery';
import Orders from './screens/Orders';
import Account from './screens/Account';
import OrderCompleted from './screens/OrderCompleted';
import OrderDetail from './components/orders/OrderDetail';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import colors from './resources/colors';
import LoginSignUp from './screens/LoginSignUp';

const store = configureStore();

export default function RootNavigation() {
  const Stack = createNativeStackNavigator();
  const Tab = createMaterialBottomTabNavigator();

  const screenOptions = {
    headerShown: false,
  };

  useEffect(() => {
    SplashScreen.hide();
    return () => {};
  }, []);

  function BottomTabScreens() {
    return (
      <Tab.Navigator
        initialRouteName="HomeScreen"
        backBehavior="history"
        barStyle={styles.barStyle}
        activeColor={colors.redShade}
        inactiveColor={colors.gray800}>
        <Tab.Screen
          name="HomeScreen"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => <Icon icon="home" color={color} />,
          }}
        />
        <Tab.Screen
          name="BrowseScreen"
          component={Browse}
          options={{
            tabBarLabel: 'Browse',
            tabBarIcon: ({color}) => <Icon icon="search" color={color} />,
          }}
        />
        <Tab.Screen
          name="GroceryScreen"
          component={Grocery}
          options={{
            tabBarLabel: 'Grocery',
            tabBarIcon: ({color}) => <Icon icon="shopping-bag" color={color} />,
          }}
        />
        <Tab.Screen
          name="OrdersScreen"
          component={Orders}
          options={{
            tabBarLabel: 'Orders',
            tabBarIcon: ({color}) => <Icon icon="receipt" color={color} />,
          }}
        />
        <Tab.Screen
          name="AccountScreen"
          component={Account}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({color}) => <Icon icon="user" color={color} />,
          }}
        />
      </Tab.Navigator>
    );
  }

  const Icon = ({icon, color}) => (
    <FontAwesome5 name={icon} size={20} color={color} />
  );

  return (
    <ReduxProvider store={store}>
      <NavigationContainer independent={true}>
        <StatusBar
          animated={true}
          backgroundColor={Platform.Version >= 23 ? '#ffffff' : '#000000'}
          barStyle={Platform.Version >= 23 ? 'dark-content' : 'default'}
          showHideTransition={'fade'}
          hidden={false}
        />
        <Stack.Navigator
          initialRouteName="BottomTabScreens"
          screenOptions={screenOptions}>
          <Stack.Screen name="BottomTabScreens" component={BottomTabScreens} />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
          <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
          <Stack.Screen name="OrderDetail" component={OrderDetail} />
          <Stack.Screen name="LoginSignUp" component={LoginSignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: colors.white,
    borderTopColor: colors.gray400,
    borderTopWidth: 1,
  },
});
