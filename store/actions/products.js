import * as SecureStore from 'expo-secure-store';
import Product from "../../models/product"

export const DELETE_PRODUCT='DELETE_PRODUCT'
export const ADD_PRODUCT='ADD_PRODUCT'
export const UPDATE_PRODUCT='UPDATE_PRODUCT'
export const SET_PRODUCT='SET_PRODUCT'

export const fetchProduct = () => {
    return async dispatch => {
        try {
            const userId = await SecureStore.getItemAsync('user_demo');
            const response = await fetch('https://rn-demo-860d2-default-rtdb.asia-southeast1.firebasedatabase.app/products.json')

            if(!response.ok){
                throw new Error('Something went wrong!')
            }

            const resData = await response.json()
            let loadedProducts = []
            for(const key in resData){
                loadedProducts.push(
                    new Product(
                        key,
                        userId,
                        resData[key].title,
                        resData[key].imageUrl,
                        parseFloat(resData[key].price),
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
                            detail:resData[key].description
                        }
                    )
                )
            }
            // console.log(loadedProducts)
            dispatch({type:SET_PRODUCT,products:loadedProducts,userId:userId})   
        } catch (err) {
            throw err
        }
    }
}

export const deleteProduct = (prodId) => {
    return async dispatch => {
        try {
            const token = await SecureStore.getItemAsync('token_demo');
            const response = await fetch(`https://rn-demo-860d2-default-rtdb.asia-southeast1.firebasedatabase.app/products/${prodId}.json?auth=${token}`,{
                method: "DELETE"
            })
            if(!response.ok){
                throw new Error('Deleting product was error')
            }
            const resData = await response.json()
            console.log(resData)
            dispatch({
                type:DELETE_PRODUCT,
                prodId:prodId
            })
        } catch (err) {
            throw err
        }
       
        
    }
}
export const editProdcut = (prodId,title,imageUrl,description) => {
    return async (dispatch) => {
        const token = await SecureStore.getItemAsync('token_demo');
        const userId = await SecureStore.getItemAsync('user_demo');
        try {
            const response = await fetch(`https://rn-demo-860d2-default-rtdb.asia-southeast1.firebasedatabase.app/products/${prodId}.json?auth=${token}`,{
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    description
                })
            })
            if(!response.ok){
                throw new Error('updating data was error')
            }
            const resData = await response.json()
            dispatch({
                type:UPDATE_PRODUCT,
                prodId:prodId,
                userId:userId,
                productData: {
                    title,
                    imageUrl,
                    description
                }
            })
            
        } catch (err) {
            throw err
        }
    }
}
export const addProdcut = (title,imageUrl,price,description) => {
    return async dispatch => {
        try {
            const token = await SecureStore.getItemAsync('token_demo');
            const userId = await SecureStore.getItemAsync('user_demo');
            const response = await fetch(`https://rn-demo-860d2-default-rtdb.asia-southeast1.firebasedatabase.app/products.json?auth=${token}`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    price,
                    description
                })
            })
            if(!response.ok){
                throw new Error('Adding data was error')
            }
            const resData = await response.json()
            await dispatch({
                type:ADD_PRODUCT,
                userId:userId,
                productData: {
                    id: resData.name,
                    title,
                    imageUrl,
                    price,
                    description
                }
            })   
        } catch (err) {
            throw err
        }
        
    }
}