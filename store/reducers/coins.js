import {COINS} from "../../data/dummy-data"

const initalState = {
    money: COINS.money,
    points: COINS.points,
}

export default coinsReducers = (state=initalState,action) => {
    switch(action.type){
        default:
            return state
    }
}