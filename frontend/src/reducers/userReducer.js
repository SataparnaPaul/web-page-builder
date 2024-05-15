// src/reducers/userReducer.js
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'USER_LOADING':
        return {
          ...state,
          loading: true
        };
      case 'USER_LOADED':
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: action.payload
        };
      case 'LOGIN_SUCCESS':
      case 'REGISTER_SUCCESS':
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          loading: false
        };
      case 'AUTH_ERROR':
      case 'LOGIN_FAIL':
      case 'LOGOUT_SUCCESS':
      case 'REGISTER_FAIL':
        return {
          ...state,
          token: null,
          user: null,
          isAuthenticated: false,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  