import {PRODUCTS} from "../../data/dummy-data"

const initalState = {
    availableProducts: PRODUCTS,
    flashSale:PRODUCTS.filter(prod => prod.flashSale===1),
    bestProduct:PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

export default productsReducres = (state=initalState,action) => {
    switch(action.type){
        default:
            return state
    }
}