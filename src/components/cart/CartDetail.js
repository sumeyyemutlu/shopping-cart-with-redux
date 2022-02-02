import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import {Table, Button } from "reactstrap";
import alertify  from "alertifyjs";

class CartDetail extends Component {
    removeFromCart(product) {//sepetten ürünleri silmek için fonksiyon tanımladık.
       //onclick işlemine fonksiyon vermek daha mantıklı çünkü birden fazla şeyi gönderebilme imkan sunuyor.
         this.props.actions.removeFromCart(product);
         alertify.error(product.productName +" sepetten silindi!",2)
    }
  render() {
    return <div>
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
              <th></th> {
                //sepete ekle kısmı için boş oluşturduk
              }
            </tr>
          </thead>
          <tbody> {
          //map fonksiyonu ile ürünleri aldık ve ne kadar ürün varsa o kadar satır oluşturup sütünlarına product bilgilerini girdik.
        }
            {this.props.cart.map((cartItem) => (
                <tr key={cartItem.product.id}>
                  <th scope="row">{cartItem.product.id}</th>
                  <td>{cartItem.product.productName}</td>
                  <td>{cartItem.quantity}</td>
                  <td>{cartItem.product.unitPrice}</td>
                  <td>
                    <Button color="danger" onClick ={()=>this.removeFromCart(cartItem.product)}>Sil</Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
    </div>;
  }
}

function mapStateToProps(state) {
    return {cart:state.cartReducer}
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail)
