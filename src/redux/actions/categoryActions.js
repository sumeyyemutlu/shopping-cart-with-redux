import * as actionTypes from './actionTypes'

export function changeCategory(category) {
    return {type:actionTypes.CHANGE_CATEGORY, payload:category}
}
//state'te CHANGE_CATEGORY görürse bunu biz state'i payload^da verilen değere göre set etmiş oluyoruz.


export function getCategoriesSuccess(categories) { //dispatch ile getCategories fonksiyonundan gelen category bilgileri çekildi.
    return {type:actionTypes.GET_CATEGORIES_SUCCESS, payload:categories}
}
//burada reducer'a GET_CATEGORIES_SUCCESS actionum var ve payload'una da gelen category bilgisi diye bir tanım yaptık


export function getCategories() {//categoryleri almak için bir fonksiyon tanımladık.
    return function(dispatch) {//return olarak dispatch parametreli bir fonksiyon dönüyor.
        let url ="http://localhost:3000/categories"
        return fetch(url).then(response =>response.json())
        //fetch() ile verilen adresten bilgiler çekilir ve response atılır. Response'a gelen bilgiler string old. için json formatına çekilir.
        .then(result => dispatch(getCategoriesSuccess(result)));
         //json'a dönüşen veriyi result'ın içine attık
         //dispatch parametresinin anlamı yakalamak aslında.
         //dispatch action'ı parametre alarak reducer'i tetikler. bunun sonucunda state değiştirilir.
    }
}