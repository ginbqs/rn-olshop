import CartItem from "../../models/cart-item";
import { ADD_TO_CART } from "../actions/cart";

const initialState = {
    items:{},
    totalAmount:0
}


export default (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;

            let updatedOrNewItems
            if(state.items[addedProduct.id]){
                updatedOrNewItems = new CartItem(
                    state.items[addedProduct.id].quantity +1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                )
            }else{
                updatedOrNewItems = new CartItem(1,prodPrice,prodTitle,prodPrice)
            }
            return {
                ...state,
                items:{
                    ...state.items,[addedProduct.id]:updatedOrNewItems
                },
                totalAmount:state.totalAmount+prodPrice
            }
            break;
        default:
            return state;
    }
}