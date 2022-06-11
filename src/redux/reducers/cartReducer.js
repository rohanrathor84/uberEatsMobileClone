let defaultState = {
  selectedItems: {items: [], restaurantImage: '', restaurantName: ''},
};

let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      let newState = {...state};
      if (action.payload.checkboxValue) {
        console.log('Add to cart');

        newState.selectedItems = {
          items: [...newState.selectedItems.items, action.payload],
          restaurantName: action.payload.restaurantName,
          restaurantImage: action.payload.restaurantImage,
        };
      } else {
        console.log('Remove from cart');
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter(
              items => items.id !== action.payload.id,
            ),
          ],
          restaurantName: action.payload.restaurantName,
          restaurantImage: action.payload.restaurantImage,
        };
      }
      console.log('CartReducer: ' + JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
};

export default cartReducer;
