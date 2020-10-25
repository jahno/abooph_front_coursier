import { 
  SIGN_IN, 
  LOG_OUT, 
  UPDATE_PROFILE,
  ADD_TO_CART, 
  INCREMENT_QTY,
  DECREMENT_QTY,
  REMOVE_FROM_CART
} from "./actionTypes";

export function signIn (data){
  return dispatch => {
    dispatch({
      type: SIGN_IN,
      token: data.token, 
      user: data.user
    })
  }
} 

export function logout (){
  return dispatch => {
    dispatch({
      type: LOG_OUT
    })
  }
} 

export function updateProfile(user){
  return dispatch => {
    dispatch({
      type: UPDATE_PROFILE,
      user: user
    })
  }
} 

export function addToCart (article, quantity,){
  return dispatch => {
    dispatch({
      type: ADD_TO_CART,
      article,
      quantity
    })
  }
} 

export function incrementQty (cartItem){
  return dispatch => {
    dispatch({
      type: INCREMENT_QTY,
      cartItem,
    })
  }
} 

export function decrementQty (cartItem){
  return dispatch => {
    dispatch({
      type: DECREMENT_QTY,
      cartItem,
    })
  }
} 

export function removeFromCart(cartItem){
  return dispatch => {
    dispatch({
      type: REMOVE_FROM_CART,
      cartItem,
    })
  }
} 


