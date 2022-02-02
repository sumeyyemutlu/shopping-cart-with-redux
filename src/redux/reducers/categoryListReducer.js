import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'

export default function changeCategoryReducer (state=initialState.categories, action) {
    //initialState içinde anlık category bilgisi olacak
    switch (action.type) {
        case actionTypes.GET_CATEGORIES_SUCCESS:
            return action.payload
            //categoryListReducer'daki getCategoriesSuccess fonksiyonunda payload:categories idi.yani categorylerin bilgisini payloada aktarmıştık.
            //artık state bilgimde içi dolu categories:[] listesi bulunuyor.
        default:
          return state;
    }
}
