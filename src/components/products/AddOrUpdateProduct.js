import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getCategories} from "../../redux/actions/categoryActions";
import {saveProduct} from "../../redux/actions/productActions"

function AddOrUpdateProduct ({
    products,
    categories,
    getProducts,
    getCategories,
    saveProduct,
    history,
    ...props //yukarıda verilenleri AddOrUpdateProduct fonksiyonunun propslarına ekle dedik.

})
{
    const [product, setProduct] = useState({...props.product});
    //state'deki productı setProduct ile set edebilirim demek (güncelleyebilirim)
    useEffect(()=>{
        if(categories.length === 0 ){//eğer kullanıcı categorylerden değil de linkle direkt geldiyse 
            getCategories();
        }
        setProduct({...props.product}, [props.product]);//props.product useEffectin içindeki lifecyle metotları yüzünden sonsuz döngüye giriyor. böyle diyerek props.product'ı izle ve doma yerleştiği zaman o fonksiyonu bitir.
    });
    function handleChange(event) {//product değişikliğe uğradığında
        const {name, value} = event.target //textbox'ın içindeki name ve value değerlerini atamış olduk.
        setProduct(previousProduct => ({//previousProduct önceki product değerim
            ...previousProduct, [name]:name === "categoryId" ? parseInt(value,10):value
        })) //...previousProduct önceki productın üzerine yaz demek
        //eğer önceki productın name değerinde categoryId diye bir şey varsa ınt e çevir yoksa value'yu olduğu gibi bas.
    }
    function handleSave(event) {//değişiklikleri kaydetme fonksiyonu. Kaydet butonuna basıldığında.
        event.preventDefault();//sayfayı güncelleme demek.
        saveProduct(product).then(()=> {//saveProduct product ı kaydet demek sonra da;  
            history.push("/")//burası daha önce geldiğimiz sayfalara yönlendirme yapmamızı sağlar.
        })
    }
}
export function getProductById(products, productId) {//ürünler ve ürünün id'si paramatere olarak gönderiliyor.
    let product = products.find(product =>product.id === productId)|| null//ürünler içinde find ile ürünler içindeki productın id si ile gönderilen product iş si eşit olanları bul
    //eşit olan yoksa null döndür.
    return product
}

function mapStateToProps (state, ownProps) {//ownProps componentlerimizin kendi içlerinde barındırdıkları proplara karşılık geliyor.
    const productId = ownProps.match.params.productId//git parametrelere bak oradan productId yi çek dedik.
    const product = productId && state.productReducer.length>0 //eğer benim productId varsa ve statetteki productReduver'ın uzunluğu sıfırdan büyükse(seppetten bahsediyor.)
    ?getProductById(state.productReducer, productId): {}//getProductById fonksiyonu ile statteki productReducerdan productId si verile ürünü ver
    //eğer productId diye bir şey yoksa bunu ekle demek istiyoruz.
}

const mapDispatchToProps = {//hookslardaki görünüm bu şekilde
    getCategories, saveProduct
}
export default connect(mapDispatchToProps, mapStateToProps)(AddOrUpdateProduct)