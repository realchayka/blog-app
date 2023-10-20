/* eslint-disable prettier/prettier */
const initialState = {
  user: null,
  error: null,
  loading: true,
  isAuth: false
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_REQUEST':
    return {
      ...state,
      loading: true,
      error: null
    }
  case 'UPDATE_SUCCESS':
    return {
      ...state,
      user: action.payload.user,
      loading: false
    }
  case 'UPDATE_FAILURE':
    return {
      ...state,
      loading: false,
      error: action.payload
    }
  case 'REGISTER_REQUEST':
    return {
      ...state,
      loading: true,
      error: null
    }
  case 'REGISTER_SUCCESS':
    return {
      ...state,
      user: action.payload.user,
      loading: false,
      isAuth: true
    }
  
  case 'REGISTER_FAILURE':
    return {
      ...state,
      user: null,
      loading: false,
      error: action.payload,
      isAuth: false
    }
  case 'LOGIN_REQUEST':
    return {
      ...state,
      loading:true,
      error:null
    }
  case 'LOGIN_SUCCESS':
    return {
      ...state,
      loading: false,
      user:action.payload.user,
      isAuth:true
    }
  case 'LOGIN_FAILURE':
    return {
      ...state,
      loading:true,
      user:null,
      error: action.payload,
      isAuth: false
    }
  case 'LOGOUT':
    return {
      ...state,
      user: null,
      loading: false,
      error: null,
      isAuth:false
    }
  case 'CLEAR_ERROR':
    return {
      ...state,
      error: null
    }
  default:
    return state
  }
}

export default userReducer
