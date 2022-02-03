import {combineReducers} from 'redux';
import changeCategoryReducer from './changeCategoryReducer';
import categoryListReducer from './categoryListReducer';
import productListReducer from './productListReducer';
import cartReducer from './cartReducer';
import saveProductReducer from './saveProductReducer';

const rootReducers = combineReducers({ //({}) demek bu bir fonksiyon ve içerisine obje alacak demek.
    categoryListReducer,
    cartReducer,
    productListReducer,
    saveProductReducer,
    changeCategoryReducer, // aslındsa bu changeCategoryReducer:changeCategoryReducer ama js özelliği ile aynı isimse obje böyle yazabiliriz.
}) //combineReducers function ile oluşturduğumuz reducer(lar)ı birleştirdik ve rootReducers değişkenine atadık
export default rootReducers;//en sonda ise bunu başka yerlerde kullanabilmek için export ettik.