import React, {PureComponent} from 'react';
import {Text, View, FlatList} from 'react-native';
import HeaderTabs from '../components/orders/HeaderTabs';
import firestore from '@react-native-firebase/firestore';
import OrdersHistoryList from '../components/orders/OrdersHistoryList';

// const unsubscribe;
let runningOrderSize = 0;

export default class Orders extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orderHistoryData: [],
      runningOrders: 0,
      completedOrders: 0,
    };
  }

  getOrdersHistory = () => {
    // let orderArrayList = [];
    const db = firestore();
    const unsubscribe = db
      .collection('orders')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        snapshot.docs.map(doc => {
          // console.log('My Order history: ' + JSON.stringify(doc.data()));
          // orderArrayList.push(doc.data());
          this.setState({
            orderHistoryData: [...this.state.orderHistoryData, doc.data()],
          });
          if (doc.data().status <= 5) {
            runningOrderSize++;
          }
        });
        // snapshot.docs.map(doc => {
        //   console.log('My Order history: ' + doc.data());
        //   this.setState({
        //     orderHistoryData: this.state.orderHistoryData.push(doc.data()),
        //   });
        //   console.log('My Order history: ' + this.state.orderHistoryData);
        // });
      });
    // setTimeout(() => {
    //   this.setState({
    //     orderHistoryData: orderArrayList,
    //   });
    // }, 5000);
  };

  componentDidMount() {
    this.getOrdersHistory();
  }

  componentWillUnmount() {
    // unsubscribe();
  }

  renderItem = ({item, index}) => {
    console.log('Data: ' + item.items[0].restaurantName);
    return (
      <OrdersHistoryList
        item={item}
        index={index}
        runningOrderSize={runningOrderSize}
        navigation={this.props.navigation}
      />
    );
  };

  render() {
    // console.log(
    //   'Order Array list: ' + JSON.stringify(this.state.orderHistoryData),
    // );
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <HeaderTabs name={'Orders'} showFilter={true} />
        <FlatList
          data={this.state.orderHistoryData}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem}
          initialNumToRender={10}
        />
      </View>
    );
  }
}
