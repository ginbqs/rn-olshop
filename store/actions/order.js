import * as SecureStore from 'expo-secure-store';
import Order from "../../models/orders"

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDER = 'SET_ORDER' 

export const fetchOrder = () => {
    return async dispatch => {
        try {
            const token = await SecureStore.getItemAsync('token_demo');
            const userId = await SecureStore.getItemAsync('user_demo');
            const response = await fetch(`https://rn-demo-860d2-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json?auth=${token}`)
            
            if(!response.ok){
                throw new Error('Something went wrong!')
            }

            const resData = await response.json()
            let loadedOrders = []
            for(const key in resData){
                loadedOrders.push(
                    new Order(
                        resData[key].id,
                        resData[key].items,
                        resData[key].amount,
                        resData[key].date,
                    )
                )
            }
            dispatch({type:SET_ORDER,orders:loadedOrders})   
        } catch (err) {
            throw err
        }
    }
}

export const addOrder = (cartItems,totalAmount) => {
    return async dispatch => {
        const date = new Date()
        try {
            const token = await SecureStore.getItemAsync('token_demo');
            const userId = await SecureStore.getItemAsync('user_demo');
            const response = await fetch(`https://rn-demo-860d2-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json?auth=${token}`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    items: cartItems, 
                    amount: totalAmount,
                    date: date.toISOString()  
                })
            })
            if(!response.ok){
                throw new Error('Adding order was error')
            }
            const resData = await response.json()
            dispatch({
                type:ADD_ORDER,
                orderData: {
                    id: resData.name,
                    items: cartItems, 
                    amount: totalAmount,
                    date: date.toISOString()
                }
            })
        } catch (err) {
            throw err
        }
        
    }
}