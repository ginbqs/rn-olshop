import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
import { fetchPlace, insertPlace } from '../../config/db';
export const SET_USER_ADDRESS = 'SET_USER_ADDRESS'
export const ADD_USER_ADDRESS = 'ADD_USER_ADDRESS'
export const EDIT_USER_ADDRESS = 'EDIT_USER_ADDRESS'
export const DELETE_USER_ADDRESS = 'DELETE_USER_ADDRESS'

export const fetchUserAddress = () => {
    return async dispatch => {
        try {
            const userId = await SecureStore.getItemAsync('user_demo');
            const response = await fetch('https://rn-demo-860d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/address.json')
            if(!response.ok){
                throw new Error('Something went wrong!')
            }

            const resData = await response.json()
            let loadedAddress = []
            for(const key in resData){
                loadedAddress.push({
                    id:key,
                    name:resData[key].name,
                    tlp:resData[key].tlp,
                    address:resData[key].address,
                    mark_as:resData[key].mark_as,
                    primary_address:resData[key].primary_address,
                    image:resData[key].image,
                    lat:resData[key].lat,
                    lang:resData[key].lang,
                })
            }
            await dispatch({type:SET_USER_ADDRESS,address:loadedAddress})   
        } catch (err) {
            throw err
        }
    }
}

export const deleteAddress = (addressId) => {
    return async dispatch => {
        try {
            const token = await SecureStore.getItemAsync('token_demo');
            const response = await fetch(`https://rn-demo-860d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/address/${addressId}.json?auth=${token}`,{
                method: "DELETE"
            })
            if(!response.ok){
                throw new Error('Deleting product was error')
            }
            const resData = await response.json()
            console.log(resData)
            dispatch({
                type:DELETE_USER_ADDRESS,
                addressId:addressId
            })
        } catch (err) {
            throw err
        }
       
        
    }
}
export const editProdcut = (addressId,name,tlp,address,mark_as,primary_address) => {
    return async (dispatch) => {
        const token = await SecureStore.getItemAsync('token_demo');
        const userId = await SecureStore.getItemAsync('user_demo');
        try {
            const response = await fetch(`https://rn-demo-860d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/address/${addressId}.json?auth=${token}`,{
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    tlp,
                    address,
                    mark_as,
                    primary_address
                })
            })
            if(!response.ok){
                throw new Error('updating data was error')
            }
            const resData = await response.json()
            dispatch({
                type:UPDATE_PRODUCT,
                addressId:addressId,
                address: {
                    name,
                    tlp,
                    address,
                    mark_as,
                    primary_address
                }
            })
            
        } catch (err) {
            throw err
        }
    }
}
export const addUserAddress = (name,tlp,address,mark_as,primary_address,image) => {
    return async dispatch => {
        try {
            const token = await SecureStore.getItemAsync('token_demo');
            const userId = await SecureStore.getItemAsync('user_demo');
            const response = await fetch(`https://rn-demo-860d2-default-rtdb.asia-southeast1.firebasedatabase.app/users/address.json?auth=${token}`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    tlp,
                    address,
                    mark_as,
                    primary_address,
                    image,
                })
            })
            if(!response.ok){
                throw new Error('Adding data was error')
            }
            const resData = await response.json()
            await dispatch({type:ADD_USER_ADDRESS,id:resData.name,name:name,tlp:tlp,address:address,mark_as:mark_as,primary_address:primary_address,image:image})
        } catch (err) {
            throw err
        }
        
    }
}


export const addUserAddressSql = (name,tlp,address,mark_as,primary_address,image,lat,lang) => {
    return async dispatch => {
        try {
            const fileName = image.split('/').pop()
            const newPath = FileSystem.documentDirectory + fileName

            await FileSystem.moveAsync({
                from: image,
                to: newPath
            })
            const dbResult = await insertPlace(name,tlp,address,mark_as,primary_address,image,lat,lang)
            await dispatch({type:ADD_USER_ADDRESS,id:dbResult.toString(),name:name,tlp:tlp,address:address,mark_as:mark_as,primary_address:primary_address,image:image,lat:lat,lang:lang})
        } catch (err) {
            console.log(err)
            throw err
        }
        
    }
}


export const fetchUserAddressSql = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlace()
            await dispatch({type:SET_USER_ADDRESS,address:dbResult.rows._array})  
        } catch (err) {
            console.log(err)
            throw err
        }
        
    }
}