// userReducer.js
const initialState = {
    userId: null,
  };
  
const SET_USER_ID = 'SET_USER_ID';
const CLEAR_USER_ID = 'CLEAR_USER_ID';

const userReducer = (state, action) => {
    switch (action.type) {
      case SET_USER_ID:
        return {
          ...state,
          userId: action.payload,
        };
      case CLEAR_USER_ID:
        return {
          ...state,
          userId: null,
        };
      default:
        return state;
    }
  };
  
  export { userReducer, initialState, SET_USER_ID, CLEAR_USER_ID };
  