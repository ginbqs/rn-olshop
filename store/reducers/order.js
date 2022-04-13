import Order from '../../models/orders'
import { ADD_ORDER, SET_ORDER } from '../actions/order'

const initialState = {
    orders : []
}


export default ordersReducers = (state = initialState, action) => {
    switch(action.type){
        case SET_ORDER:
           return {
               orders : action.orders
           }
        case ADD_ORDER:
            const newOrder = new Order(
                action.orderData.id,
                action.orderData.items,
                action.orderData.amount,
                action.orderData.date
            )
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
        default:
            return state
    }
}