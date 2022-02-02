import * as actionTypes from './actionTypes';

export function getProductsSuccess(products) {
    return {
        type:actionTypes.GET_PRODUCTS_SUCCESS, payload:products}
}

export function getProducts(categoryId) {//productları almak için bir fonksiyon tanımladık. Tüm ürünler listelenecek.
    return function(dispatch) {//return olarak dispatch parametreli bir fonksiyon dönüyor.
        let url ="http://localhost:3000/products"
        if(categoryId) {
            url = url+"?categoryId="+categoryId//ürünleri categoryİdlerine göre sınıflandırmamızı sağlar.
        }
        return fetch(url).then(response =>response.json())
        //fetch() ile verilen adresten bilgiler çekilir ve response atılır. Response'a gelen bilgiler string old. için json formatına çekilir.
        .then(result => dispatch(getProductsSuccess(result)));
         //json'a dönüşen veriyi result'ın içine attık
         //dispatch parametresinin anlamı yakalamak aslında.
         //dispatch action'ı parametre alarak reducer'i tetikler. bunun sonucunda state değiştirilir.
    }
}