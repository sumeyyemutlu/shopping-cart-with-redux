import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownItem, DropdownToggle,DropdownMenu, NavItem, NavLink, Badge} from 'reactstrap'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import  {Link} from  'react-router-dom';
import alertify  from "alertifyjs";

 class CartSummary extends Component {
  removeFromCart(product) {//sepetten ürünleri silmek için fonksiyon tanımladık.
    //onclick işlemi için bir fonksiyon dönmesi gerektiğinden
     this.props.actions.removeFromCart(product);
     alertify.error(product.productName +" sepetten silindi!",2)
}
     renderEmpty() {//sepet boşsa bu fonksiyon çalışacak.
         return (
            <NavItem>
                <NavLink>Sepetiniz Boş</NavLink>
            </NavItem>
        )
     }
     renderSummary() {//sepet doluysa bu fonksiyon çalışacak.
         return (
            <UncontrolledDropdown
          inNavbar
          nav
        >
          <DropdownToggle
            caret
            nav
          >
            Sepetiniz
          </DropdownToggle>
          <DropdownMenu right>{//açılır menü. sepetiniz yazan navbar kısmında.
          }
              {this.props.cart.map(cartItem=> (//sepet içinde dolaş ve eklediğimiz ürünü sepette göster.
                   <DropdownItem key={cartItem.product.id}>
                       <Badge color='danger' onClick={()=> this.removeFromCart(cartItem.product)}>-</Badge>
                       {//ürünü sepetten çıkarmak için bir badge tanımladık.
                       //ve buna tıklandığında removeFromCart actionu'na tıkladığımız ürünün bilgileri gidecek.
                    }
                       {cartItem.product.productName}{//ürünlerin isimleri sepette gösterildi.
                       }
                       <Badge color="success">{cartItem.quantity}</Badge>{//sepetteki ürünlerin yanına kaç tane olduğu bilgisi verildi.
                       }
                    </DropdownItem>
              ))}
            <DropdownItem divider />
            <DropdownItem>
              <Link to={"/cart"}>Sepete git</Link> {
                //navbar'da sepetiniz olduğu kısımın içinde bir link tanımladık.
                //Sepete eklediğimiz ürünleri /cart'da görüyoruz.
              }
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
         )
     }
  render() {
    return <div>
         {this.props.cart.length>0?this.renderSummary():this.renderEmpty()}
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

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary)
