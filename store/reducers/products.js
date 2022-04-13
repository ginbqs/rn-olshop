import {PRODUCTS} from "../../data/dummy-data"
import Product from "../../models/product"
import {ADD_PRODUCT, DELETE_PRODUCT, SET_PRODUCT, UPDATE_PRODUCT} from '../actions/products'
import * as Notifications from 'expo-notifications'

// const initalState = {
//     availableProducts: PRODUCTS,
//     flashSale:PRODUCTS.filter(prod => prod.flashSale===true),
//     bestProduct:PRODUCTS,
//     userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
// }


const initalState = {
    availableProducts: [],
    flashSale:[],
    bestProduct:[],
    userProducts: []
}

export default productsReducers = (state=initalState,action) => {
    switch(action.type){
        case SET_PRODUCT:
            return {
                ...state,
                availableProducts: action.products,
                flashSale: action.products.filter(prod => prod.flashSale===true),
                bestProduct: action.products,
                userProducts: action.products.filter(prod => prod.ownerId === action.userId),
            }
        case ADD_PRODUCT:
            const temptAddProduct = new Product(
                action.productData.id,
                action.userId,
                action.productData.title,
                action.productData.imageUrl,
                parseInt(action.productData.price),
                10,
                true,
                20,
                10,
                98,
                12,
                1.5,
                false,
                {
                    condition:'baru',
                    minOrder:1,
                    group:'Ilmu Pengetahuan',
                    detail:action.productData.description
                }
            )   
            return {
                ...state,
                availableProducts: state.availableProducts.concat(temptAddProduct),
                flashSale:state.flashSale.concat(temptAddProduct),
                bestProduct:state.bestProduct.concat(temptAddProduct),
                userProducts: state.userProducts.concat(temptAddProduct)
            }
        case UPDATE_PRODUCT:
            const pidUpdate = action.prodId
            const productIndex = state.userProducts.findIndex(prod => prod.id === pidUpdate)
            const temptEditProduct = new Product(
                pidUpdate,
                action.userId,
                action.productData.title,
                action.productData.imageUrl,
                state.userProducts[productIndex].price,
                10,
                true,
                20,
                10,
                98,
                12,
                1.5,
                false,
                {
                    condition:'baru',
                    minOrder:1,
                    group:'Ilmu Pengetahuan',
                    detail:action.productData.description
                }
            )   
            const tempUserProducts = [...state.userProducts]
            tempUserProducts[productIndex] = temptEditProduct

            const productIndexAvailable = state.availableProducts.findIndex(prod => prod.id === pidUpdate)
            const tempAvailableProducts = [...state.availableProducts]
            tempAvailableProducts[productIndexAvailable] = temptEditProduct

            const productIndexFlashsale = state.flashSale.findIndex(prod => prod.id === pidUpdate)
            const tempFlashsaleProducts = [...state.flashSale]
            tempFlashsaleProducts[productIndexFlashsale] = temptEditProduct

            const productIndexBest = state.bestProduct.findIndex(prod => prod.id === pidUpdate)
            const tempBestProducts = [...state.bestProduct]
            tempBestProducts[productIndexBest] = temptEditProduct
            return {
                ...state,
                availableProducts: tempAvailableProducts,
                flashSale: tempFlashsaleProducts,
                bestProduct: tempBestProducts,
                userProducts: tempUserProducts
            }
        case DELETE_PRODUCT:
            const prodIdDelete = action.prodId;
            return {
                ...state,
                availableProducts: state.availableProducts.filter(prod => prod.id != prodIdDelete),
                flashSale: state.flashSale.filter(prod => prod.id != prodIdDelete),
                bestProduct: state.bestProduct.filter(prod => prod.id != prodIdDelete),
                userProducts: state.userProducts.filter(prod => prod.id != prodIdDelete)
            }
        default:
            return state
    }
}