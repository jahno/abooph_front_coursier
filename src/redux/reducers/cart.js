import {
    ADD_TO_CART,
    INCREMENT_QTY,
    REMOVE_FROM_CART,
    DECREMENT_QTY 
} from "../actionTypes";

export default function cartReducer(state = [], action) {
    let newState = [...state];

    switch (action.type) {
        case ADD_TO_CART:
            return [...newState, {...action.article, qty: action.quantity}]
        case INCREMENT_QTY:
            let i = 0;
            for(let item of newState){
                if((parseInt(item.id) === parseInt(action.cartItem.id)) && (parseInt(item.price) === parseInt(action.cartItem.price)) && (parseInt(item.qty) <= 49)){
                    newState[i] = {...item, qty: parseInt(item.qty) + 1}
                    break;
                }
                i++
            }
            return newState
        case DECREMENT_QTY:
            let y = 0;
            for(let item of newState){
                if((parseInt(item.id) === parseInt(action.cartItem.id)) && (parseInt(item.price) === parseInt(action.cartItem.price)) && (parseInt(item.qty) > 1)){
                    newState[y] = {...item, qty: parseInt(item.qty) - 1}
                    break;
                }
                y++
            }
            return newState
        case REMOVE_FROM_CART:
            return  newState.filter(item => {
                return !(item.id === action.cartItem.id && item.price === action.cartItem.price)
            })
        default:
    }
    return state;
}
