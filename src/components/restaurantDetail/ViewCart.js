import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import OrderItem from './OrderItem';
import firestore, {firebase} from '@react-native-firebase/firestore';
import LottieView from 'lottie-react-native';
import {TimeConverter} from '../../utilities/utils';

export default function ViewCart({navigation}) {
  const [modalVisible, setmodalVisible] = useState(false);
  const [loading, setloading] = useState(false);

  const {items, restaurantImage, restaurantName} = useSelector(
    state => state.cartReducer.selectedItems,
  );

  const total = items
    .map(item => Number(item.price.replace('$', '')))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = `$${(Math.round(total * 100) / 100).toFixed(2)}`;

  const addOrderTOFireBase = () => {
    firestore()
      .collection('orders')
      .add({
        items: items,
        restaurantImage: restaurantImage,
        restaurantName: restaurantName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: 1,
        total: totalUSD,
        orderOn: `${new Date().toDateString()} at ${TimeConverter(
          new Date().toLocaleTimeString(),
        )}`,
      })
      .then(() => {
        setmodalVisible(false);
        setTimeout(() => {
          console.log('orders added!');
          setloading(false);
          navigation.navigate('OrderCompleted');
        }, 2500);
      });
  };

  const checkoutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text>{totalUSD}</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: 'black',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 13,
                  borderRadius: 30,
                  width: 300,
                  position: 'relative',
                }}
                onPress={() => {
                  setloading(true);
                  addOrderTOFireBase();
                }}>
                <Text style={{color: 'white', fontSize: 20}}>Checkout</Text>
                <Text
                  style={{
                    position: 'absolute',
                    right: 20,
                    color: 'white',
                    fontSize: 15,
                  }}>
                  {total ? totalUSD : ''}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };

  console.log('Total sum: ' + totalUSD);
  return (
    <>
      {loading ? (
        <View
          style={{
            backgroundColor: 'black',
            opacity: 0.6,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            width: '100%',
            height: '100%',
          }}>
          <LottieView
            style={{height: 200}}
            source={require('../../assets/animations/scanner.json')}
            autoPlay={true}
            speed={3}
          />
        </View>
      ) : (
        <>
          <Modal
            animationType="slide"
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => setmodalVisible(false)}>
            {checkoutModalContent()}
          </Modal>
          {total ? (
            <View
              style={{
                alignItems: 'center',
                position: 'absolute',
                bottom: 26,
                zIndex: 900,
                justifyContent: 'center',
                left: 0,
                right: 0,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'black',
                  alignItems: 'center',
                  padding: 15,
                  borderRadius: 30,
                  width: 250,
                  position: 'relative',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
                activeOpacity={0.5}
                onPress={() => setmodalVisible(true)}>
                <Text style={{color: 'white', fontSize: 16}}>View Cart</Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    position: 'absolute',
                    right: 16,
                  }}>
                  {totalUSD}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },

  modalCheckoutContainer: {
    backgroundColor: 'white',
    padding: 16,
    height: 500,
    borderWidth: 1,
  },

  restaurantName: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 10,
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  subtotalText: {
    textAlign: 'left',
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 10,
  },
});
