import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'

export default function changeCategoryReducer (state=initialState.currentCategory, action) {
    //initialState içinde anlık category bilgisi olacak
    switch (action.types) {
        case actionTypes.CHANGE_CATEGORY:
            return action.payload
        default:
          return state;
    }
}
