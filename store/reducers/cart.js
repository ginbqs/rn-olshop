import CartItem from "../../models/cart-item";
import { ADD_TO_CART,DELETE_FROM_CART,ADDED_TO_CART,SUBSTRACTED_TO_CART,SUM_CART, UPDATED_CHECKED_PRODUCT } from "../actions/cart";
import { ADD_ORDER } from "../actions/order";

const initialState = {
    items:{},
    totalAmount:0,
    totalItems:0
}
export default cartsReducers = (state = initialState, action) =>{
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodTitle = addedProduct.title;
            const imageUrl = addedProduct.imageUrl;
            const freeShipping = addedProduct.freeShipping;
            const productPriceOrigin = addedProduct.price;
            const discount = addedProduct.discount;
            const productPrice = addedProduct.discount > 0 ? addedProduct.price - (addedProduct.price*addedProduct.discount/100) : addedProduct.price;
            const ownerId = addedProduct.ownerId;
            const ownerName = addedProduct.ownerName;
            const ownerLogo = addedProduct.ownerLogo;
            const address = addedProduct.address;
            const note = '';

            let updatedOrNewItems
            if(state.items[addedProduct.id]){
                updatedOrNewItems = new CartItem(
                    prodTitle,
                    imageUrl,
                    freeShipping,
                    productPriceOrigin,
                    discount,
                    productPrice,
                    state.items[addedProduct.id].quantity +1,
                    state.items[addedProduct.id].sum + productPrice,
                    note,
                    ownerId,
                    ownerName,
                    ownerLogo,
                    address,
                    false
                )
            }else{
                updatedOrNewItems = new CartItem(prodTitle,imageUrl,freeShipping,productPriceOrigin,discount,productPrice,1,productPrice,note,ownerId,ownerName,ownerLogo,address,false)
            }
            return {
                ...state,
                items:{
                    ...state.items,[addedProduct.id]:updatedOrNewItems
                },
                // totalAmount:state.totalAmount+productPrice
            }
        case DELETE_FROM_CART:
            const pid = action.productId
            const selectedItem = state.items[pid]
            let updatedCartItems
            updatedCartItems = {...state.items}
            delete updatedCartItems[pid]
            return {
                ...state,
                items:updatedCartItems,
                totalAmount:state.totalAmount - selectedItem.sum,
                totalItems:state.totalItems - 1
            };
        case ADDED_TO_CART:
            const pidAdded = action.productId
            const selectedAddedItem = state.items[pidAdded]
            let totalAmountAdded = state.totalAmount
            if(selectedAddedItem.isChecked){
                totalAmountAdded+=selectedAddedItem.productPrice
            }
            let addedCartItems
            
            addedCartItems = new CartItem(
                selectedAddedItem.prodTitle,
                selectedAddedItem.imageUrl,
                selectedAddedItem.freeShipping,
                selectedAddedItem.productPriceOrigin,
                selectedAddedItem.discount,
                selectedAddedItem.productPrice,
                selectedAddedItem.quantity +1,
                selectedAddedItem.sum + selectedAddedItem.productPrice,
                selectedAddedItem.note,
                selectedAddedItem.ownerId,
                selectedAddedItem.ownerName,
                selectedAddedItem.ownerLogo,
                selectedAddedItem.address,
                selectedAddedItem.isChecked
            )
            return {
                ...state,
                items:{...state.items,[pidAdded]:addedCartItems},
                totalAmount: totalAmountAdded
            };
            case SUBSTRACTED_TO_CART:
                const pidSubstracted = action.productId
                const selectedSubstractedItem = state.items[pidSubstracted]
                let totalAmountSubtracted = state.totalAmount
                if(selectedSubstractedItem.isChecked){
                    totalAmountSubtracted -=selectedSubstractedItem.productPrice
                }
                let substractedCartItems
                if(selectedSubstractedItem.quantity-1 >= 1){
                    substractedCartItems = new CartItem(
                        selectedSubstractedItem.prodTitle,
                        selectedSubstractedItem.imageUrl,
                        selectedSubstractedItem.freeShipping,
                        selectedSubstractedItem.productPriceOrigin,
                        selectedSubstractedItem.discount,
                        selectedSubstractedItem.productPrice,
                        selectedSubstractedItem.quantity - 1,
                        selectedSubstractedItem.sum - selectedSubstractedItem.productPrice,
                        selectedSubstractedItem.note,
                        selectedSubstractedItem.ownerId,
                        selectedSubstractedItem.ownerName,
                        selectedSubstractedItem.ownerLogo,
                        selectedSubstractedItem.address,
                        selectedSubstractedItem.isChecked
                    )
    
                    return {
                        ...state,
                        items:{...state.items,[pidSubstracted]:substractedCartItems},
                        totalAmount: totalAmountSubtracted
                    };
                }
                return state;
            case SUM_CART:
                const totalAmount = action.totalAmount
                const totalItems = action.totalItems
                return {
                    ...state,
                    totalAmount : totalAmount,
                    totalItems: totalItems
                };
            case UPDATED_CHECKED_PRODUCT:
                const pidChecked = action.productId
                const isCheckedItem = action.isChecked
                const selectedCheckedItem = state.items[pidChecked]
                let totalAmountIsChecked = state.totalAmount 
                let totalItemsIsChecked = state.totalItems 
                
                
                let checkedCartItems
                checkedCartItems = new CartItem(
                    selectedCheckedItem.prodTitle,
                    selectedCheckedItem.imageUrl,
                    selectedCheckedItem.freeShipping,
                    selectedCheckedItem.productPriceOrigin,
                    selectedCheckedItem.discount,
                    selectedCheckedItem.productPrice,
                    selectedCheckedItem.quantity,
                    selectedCheckedItem.sum,
                    selectedCheckedItem.note,
                    selectedCheckedItem.ownerId,
                    selectedCheckedItem.ownerName,
                    selectedCheckedItem.ownerLogo,
                    selectedCheckedItem.address,
                    isCheckedItem
                )
                if(isCheckedItem && selectedCheckedItem.isChecked){

                }else if(!isCheckedItem && !selectedCheckedItem.isChecked){

                }else{
                    if(!selectedCheckedItem.isChecked){
                        totalAmountIsChecked += selectedCheckedItem.sum
                        totalItemsIsChecked +=1
                    }else{
                        totalAmountIsChecked -= selectedCheckedItem.sum
                        totalItemsIsChecked -=1
                    }
                }
                return {
                    ...state,
                    items:{...state.items,[pidChecked]:checkedCartItems},
                    totalAmount:totalAmountIsChecked,
                    totalItems:totalItemsIsChecked
                };
            case ADD_ORDER:
                let updatedCartOrderItems
                updatedCartOrderItems = {...state.items}
                for(key in state.items){
                    if(state.items[key].isChecked){
                        delete updatedCartOrderItems[key]
                    }
                }
                return {
                    ...state,
                    items:updatedCartOrderItems,
                    totalAmount:0,
                    totalItems:0
                };
        default:
            return state;
    }
}