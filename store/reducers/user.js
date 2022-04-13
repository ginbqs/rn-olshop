import { ADD_USER_ADDRESS, SET_USER_ADDRESS } from "../actions/user";

const initialValues = {
    address:[]
}

export default usersReducres = (state=initialValues,action) => {
    switch(action.type){
        case SET_USER_ADDRESS:
            return {
                ...state,
                address:action.address
            }
        case ADD_USER_ADDRESS:
            let updateUser
            updateUser ={
                id: action.id,
                name: action.name,
                tlp: action.tlp,
                address: action.address,
                mark_as: action.mark_as,
                primary_address: action.primary_address,
                image: action.image,
                lat: action.lat,
                lang: action.lang,
            }
            return {
                ...state,
                address:state.address.concat(updateUser)
            }
        default:
            return state
    }
}