import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'

export default function productListReducer (state=initialState.products, action) {
    //initialState içinde products bilgisi olacak
    switch (action.type) {
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return action.payload
            //action.payload ile productActions dosyasındaki getProductsSuccess actionuna gelen parametre ile payloada apiden çektiğimiz productlar gelir.
            //artık state bilgimde içi dolu products:[] listesi bulunuyor.
        default:
          return state;
    }
}
