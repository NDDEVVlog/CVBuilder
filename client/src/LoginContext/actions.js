// actions.js
import { SET_USER_ID, CLEAR_USER_ID } from './userReducer';

export const setUserId = (userId) => ({
  type: SET_USER_ID,
  payload: userId,
});

export const clearUserId = () => ({
  type: CLEAR_USER_ID,
});
