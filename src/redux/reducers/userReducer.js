let defaultState = {
  userInfo: {
    userName: '',
    isLoggedIn: false,
  },
};

let userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_USER_INFO':
      let newState = {...state};
      return (newState.userInfo = {
        ...newState.userInfo,
        isLoggedIn: action.payload.isLoggedIn,
      });
    case 'REMOVE_USER_INFO':
      return (state.userInfo = {
        isLoggedIn: action.payload.isLoggedIn,
      });
    default:
      return state;
  }
};

export default userReducer;
