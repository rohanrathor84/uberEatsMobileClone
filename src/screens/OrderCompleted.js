import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import MenuItems from '../components/restaurantDetail/MenuItems';
import firestore from '@react-native-firebase/firestore';

export default function orderCompleted() {
  const [lastOrder, setlastOrder] = useState({
    items: [
      {
        title: 'Bologna',
        description: 'With butter lettuce, tomato and sauce bechamel',
        price: '$13.50',
        image:
          'https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg',
      },
    ],
  });
  const {items, restaurantImage, restaurantName} = useSelector(
    state => state.cartReducer.selectedItems,
  );

  const total = items
    .map(item => Number(item.price.replace('$', '')))
    .reduce((prev, curr) => prev + curr, 0);

  useEffect(() => {
    const db = firestore();
    const unsubscribe = db
      .collection('orders')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .onSnapshot(snapshot => {
        snapshot.docs.map(doc => {
          setlastOrder(doc.data());
        });
      });
    return () => {
      unsubscribe();
    };
  }, [lastOrder]);
  return (
    <FlatList
      data={lastOrder.items}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: 'white'}}
      ListHeaderComponent={
        <View style={{margin: 15, alignItems: 'center'}}>
          <LottieView
            style={{height: 100, alignSelf: 'center', marginBottom: 30}}
            source={require('../assets/animations/check-mark.json')}
            autoPlay={true}
            speed={0.5}
            loop={false}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Your order at {restaurantName} has been placed for ${total}
          </Text>
        </View>
      }
      renderItem={({item, index}) => (
        <MenuItems
          restaurantName={restaurantName}
          restaurantImage={restaurantImage}
          item={item}
          index={index}
          foods={lastOrder.items}
          hideCheckbox={true}
        />
      )}
      ListFooterComponent={
        <LottieView
          style={{height: 200, alignSelf: 'center', marginBottom: 20}}
          source={require('../assets/animations/cooking.json')}
          autoPlay={true}
          speed={0.5}
          loop={false}
        />
      }
    />
  );
}
