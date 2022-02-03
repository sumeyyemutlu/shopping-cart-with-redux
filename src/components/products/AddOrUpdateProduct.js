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
    function handleSave(event) {//değişiklikleri laydetme fonksiyonu. kaydet butonuna basıldığında
        event.preventDefault();//sayfayı güncelleme demek.
        saveProduct(product).then(()=> {
            history.push("/")//burası daha önce geldiğimiz sayfalara yönlendirme yapmamızı sağlar.
        })
    }
}
const mapDispatchToProps = {//hookslardaki görünüm bu şekilde
    getCategories, saveProduct
}
export default connect()(AddOrUpdateProduct)