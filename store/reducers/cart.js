import CartItem from "../../models/cart-item";
import { ADD_TO_CART } from "../actions/cart";

const initialState = {
    items:{},
    totalAmount:0
}
export default cartsReducers = (state = initialState, action) =>{
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodTitle = addedProduct.prodTitle;
            const freeShipping = addedProduct.freeShipping;
            const productPriceOrigin = addedProduct.price;
            const discount = addedProduct.discount;
            const productPrice = addedProduct.discount > 0 ? addedProduct.price - (addedProduct.price*addedProduct.discount/100) : addedProduct.price;
            const ownerId = addedProduct.ownerId;
            const ownerName = addedProduct.ownerName;
            const address = addedProduct.address;
            const note = '';

            let updatedOrNewItems
            if(state.items[addedProduct.id]){
                updatedOrNewItems = new CartItem(
                    prodTitle,
                    freeShipping,
                    productPriceOrigin,
                    discount,
                    productPrice,
                    state.items[addedProduct.id].quantity +1,
                    state.items[addedProduct.id].sum + productPrice,
                    note,
                    ownerId,
                    ownerName,
                    address
                )
            }else{
                updatedOrNewItems = new CartItem(prodTitle,freeShipping,productPriceOrigin,discount,productPrice,1,productPrice,note,ownerId,ownerName,address)
            }
            return {
                ...state,
                items:{
                    ...state.items,[addedProduct.id]:updatedOrNewItems
                },
                totalAmount:state.totalAmount+productPrice
            }
            break;
        default:
            return state;
    }
}