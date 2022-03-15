import {PRODUCTS} from "../../data/dummy-data"

const initalState = {
    availableProducts: PRODUCTS,
    flashSale:PRODUCTS.filter(prod => prod.flashSale===true),
    bestProduct:PRODUCTS,
    userProducts: PRODUCTS
}

export default productsReducers = (state=initalState,action) => {
    switch(action.type){
        default:
            return state
    }
}