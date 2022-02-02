import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge, Table, Button } from "reactstrap";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import * as cartActions from "../../redux/actions/cartActions";
import alertify  from "alertifyjs";

class ProductList extends Component {
  
  componentDidMount() {
    this.props.actions.getProducts();
  } //bunun sayesinde uygulama çalışır çalışmaz product bilgilerini çekmiş oluyoruz.

  addToCart =(product)  => {//ileride sepete ekle dediğimizde alert de çıkartacağız bu yüzden fonksiyon içine yazdık.
    this.props.actions.addToCart({quantity:1, product});//ürün ekliyoruz ve değerini 1 yaptık ve ürünü ekledik. bu bizim cartItemımız.
    alertify.success(product.productName +"sepete eklendi!",2)
  }

  render() {
    return (
      <div>
        <h3>
          Products -
          <i>
            <Badge color="warning">
              {this.props.currentCategory.categoryName}
            </Badge>
          </i>
        </h3>
        {
          //Badge ile Product başlığının yanına bir alan oluşturduk
          //Ve içine anlık category bilgilerini yazdırıyoruz.
        }
        <Table>
          <thead>
            <tr>
              {
                //ana başlıkları tanımladık. bir satırda.
              }
              <th>#</th>
              <th>Product Name</th>
              <th>Quantity Per Unit</th>
              <th>Unit Price</th>
              <th>Units In Stock</th>
              <th></th> {
                //sepete ekle kısmı için boş oluşturduk
              }
            </tr>
          </thead>
          <tbody> {
          //map fonksiyonu ile ürünleri aldık ve ne kadar ürün varsa o kadar  satır oluşturup sütünlarına product bilgilerini girdik.
        }
            {this.props.products.map((product) => (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td>{product.productName}</td>
                  <td>{product.quantityPerUnit}</td>
                  <td>{product.unitPrice}</td>
                  <td>{product.unitsInStock}</td>
                  <td>
                    <Button color="success" onClick ={()=>this.addToCart(product)}>Sepete ekle</Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}
function mapStateToProps(state) {
  //statei almaya yarayan bir fonksiyon
  return {
    currentCategory: state.changeCategoryReducer, //product'ın yanına o anki category bilgisini eklemke için curretnCategory lazım.
    products: state.productListReducer //artık ProductList componentinin propslarında products diye bir şey var.
  };
}

function mapDispatchToProps(dispatch) {
  //actionlar almaya yarayan bir fonksiyon tanımladık
  return {
    actions: {
      //bu fonksiyon bir array döndürüyor
      getProducts: bindActionCreators(productActions.getProducts, dispatch), //productActionların içindeki getProducts fonksiyonunu çağırdık buna bağlı olan getProductsSuccess action'u tetiklenmiş oldu.
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
    }, //bindActionCreators çoklu action üreticilerinin tek seferde dispatch edilmesini sağlar. yani yakalanamsını.
   
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
