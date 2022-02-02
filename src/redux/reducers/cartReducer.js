import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"

export default function cartReducer(state = initialState.cart, action) {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            var addedItem = state.find(c=>c.product.id === action.payload.product.id) //sepetekki productın id si aciton ile gelen payloadun içindeki product id ye eşit mi diye kontrol ettik. ve bunu addedİtem a atadık.
            if(addedItem){//eğer eşitse(addedItem varsa) 
                var newState = state.map(cartItem => {
                    if(cartItem.product.id === action.payload.product.id) {
                        return Object.assign({}, addedItem,{quantity:addedItem.quantity+1})
                        //Object.assign metodu nesneleri birbileri üzerinde kopyalanmasını sağlar
                        //içindeki boş {} kopyasını al demek
                        //bu sayede an yer değiştirilememiş kopyası üzerinden işlem yapılmış oldu.
                    }
                    return cartItem;
                })
                return newState;
            }
            else {
                return [...state, {...action.payload}]//eğer ürün yeniyse state'n(cart'ın) bir kopyasını al
                //ve içine action.payload ile gelen yeni ürünün kopyasını koy.
            }
        case actionTypes.REMOVE_FROM_CART:
            const newState2= state.filter(cartItem=>cartItem.product.id !== action.payload.id)
             //sepetteki ürünlerin id si ile gelen ürünün id si farklı olanları listele
             //bir onclick işlemi ile product gönderilecek oradan id'sinin aynı olup olmadığını filter metodu ile anlayacağız.
            return newState2;
        default:
            return state;
    }
}