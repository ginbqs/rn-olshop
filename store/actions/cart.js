export const ADD_TO_CART = 'ADD_TO_CART'
export const DELETE_FROM_CART = 'DELETE_FROM_CART'
export const SUBSTRACTED_TO_CART = 'SUBSTRACTED_TO_CART'
export const ADDED_TO_CART = 'ADDED_TO_CART'
export const SUM_CART = 'SUM_CART'
export const UPDATED_CHECKED_PRODUCT = 'UPDATED_CHECKED_PRODUCT'


export const addToCart = product => {
    return {type:ADD_TO_CART,product:product}
}

export const deleteFromCart = productId => {
    return {type:DELETE_FROM_CART,productId:productId}
}

export const substractedToCart = productId => {
    return {type:SUBSTRACTED_TO_CART,productId:productId}
}
export const addedToCart = productId => {
    return {type:ADDED_TO_CART,productId:productId}
}
export const sumCart = (totalAmount,totalItem) => {
    return {type:SUM_CART,totalAmount:totalAmount,totalItem:totalItem}
}
export const updateCheckedProduct = (productId,isChecked) => {
    return {type:UPDATED_CHECKED_PRODUCT,productId,isChecked}
}