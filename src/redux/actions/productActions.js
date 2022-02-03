import * as actionTypes from "./actionTypes";

export function getProductsSuccess(products) {
  return {
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    payload: products,
  };
}
export function createProductSuccess(product) {
  return {
    type: actionTypes.CREATE_PRODUCT_SUCCESS,
    payload: product,
  };
}
export function updateProductSuccess(product) {
  return {
    type: actionTypes.UPDATE_PRODUCT_SUCCESS,
    payload: product,
  };
}
export function saveProductApi(product) {
  //yeni ürün kaydetmeye yarar.
  return fetch("http://localhost:3000/products/" + (product.id || ""), {
    method: product.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" }, //apinin default ayarıdır.
    body: JSON.stringify(product), //body post veya put yaptığımızda fetch içindeki url e gönderdiğimiz datadır. bunu sitringe çevir dedik. içine de fonksiyona gelen productı attık.
  })
    .then(handleResponse)
    .catch(handleError); //hata verilirse catch yakalayacak.
  //çünkü requestler stringtir.
} //fetch ile products sayfasına gidiyorum ve sayfanın sonuna id gönderişmişse eklkiyorum gönderilmemişse bir şey eklemiyorum
//eğer product.id gönderilmişse bu put request gönderilmemişse bu Post requesttir. post zaten göndermek demek. yani url deki datayı istemiyorum ben sana gönderiyorum demek istiyoruz.
//yani id gönderilmişse güncelleme var gönderilmemişse yeni bir ekleme var

export function saveProduct(product) {
  return function (dispatch) {
    //dispatch ile actionları aktif ediyoruz.
    return saveProductApi(product).then((savedProduct) => {// saveProduct a gelen product parametresini savePorductApi ye aktardık
      product.id//eğer gelen product bilgisinde product.id varsa 
        ? dispatch(updateProductSuccess(savedProduct))//updateProductSucces fonksiyonu çalışsın
        : dispatch(createProductSuccess(savedProduct));//yoksa createProductSuccess fonskiyonu çalışsın.
    }).catch(error => {throw error});//hata dönerse hatayı throw ile fırlat, göster
  };
} 

export async function handleResponse(response) {//asenkron bir fonk. oluşturduk
    if(response.ok) {//dönen cevap ok ise
        return response.json()// bu cevabı json a çevir.
    }
    const error = await response.text()// eğer dönen cevap ok değilse mesajı text e dönüştür
    throw new Error(error);//sonra yeni bir error oluştur içine gelen texti koy fırlat
}
export function handleError(error) {
    console.error("Bir hata oluştur...")
    throw error;

}
export function getProducts(categoryId) {
  //productları almak için bir fonksiyon tanımladık. Tüm ürünler listelenecek.
  return function (dispatch) {
    //return olarak dispatch parametreli bir fonksiyon dönüyor.
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url = url + "?categoryId=" + categoryId; //ürünleri categoryİdlerine göre sınıflandırmamızı sağlar.
    }
    return (
      fetch(url)
        .then((response) => response.json())
        //fetch() ile verilen adresten bilgiler çekilir ve response atılır. Response'a gelen bilgiler string old. için json formatına çekilir.
        .then((result) => dispatch(getProductsSuccess(result)))
    );
    //json'a dönüşen veriyi result'ın içine attık
    //dispatch parametresinin anlamı yakalamak aslında.
    //dispatch action'ı parametre alarak reducer'i tetikler. bunun sonucunda state değiştirilir.
  };
}
