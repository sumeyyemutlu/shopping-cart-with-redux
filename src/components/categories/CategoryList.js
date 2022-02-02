import React, { Component } from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as productActions from "../../redux/actions/productActions";


class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  } //render içine url almış fonksiyonlar geçemez çünkü başka sayfaya yönlendirme olmasın diye
  //bu yüzden componentDidMount metodunu kullanıyoruz.

  selectCategory = (category) => {
    //categorye tıklayınca seçme işlemini fonksiyona attık.
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category.id);//productActions'ların içindeki getProducts fonksiyonu categoryleri sınıflandırabilmesi için categoryId diye bir parametre alıyordu.
  };//artık productActionların içindeki getProducts fonksiyonunaseçilen  categoryid si iletildi ve getproductSuccess actionuna seçilen ctageoryId ye sahip productlar geldi. Bunu da productListReducerda state e atttık artık o ürünler listelenecek.
  render() {
    return (
      <div>
        <h3> Categories</h3>
        <ListGroup>
          {
            //propsların içindeki categorieslara git ve categoryleri map ile al.
          }
          {this.props.categories.map((category) => (
            <ListGroupItem
              active={category.id === this.props.currentCategory.id}
              onClick={() => this.selectCategory(category)}//seçili categoryi bulmamıza yarayan fonksiyonu ekledik.
              key={category.id}
            >
              {
                //category.id currentCategory içindeki id ye eşitse mavi yaptık.
                //ListGroupItem'dan bir categorye tıklandığında changecategory'ye o categorynin bilgileri gidecek.
              }
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
        
        {
          //changeCategory'den gelen category bilgisi currentCategory'ye iletildi.
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  //statei almaya yarayan bir fonksiyon
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  //actionlar almaya yarayan bir fonksiyon tanımladık
  return {
    actions: {
      //bu fonksiyon bir array döndürüyor
      getCategories: bindActionCreators(categoryActions.getCategories, dispatch),
      changeCategory: bindActionCreators(categoryActions.changeCategory, dispatch), //bunu değişen categoryleri göstermek için verdik.
      getProducts: bindActionCreators(productActions.getProducts, dispatch)
      //getCategories fonksiyonu ile getcategoriessuccess actionunu tetiklemiş olduk.
    }, //bindActionCreators ile actionları bağladık(dahil ettik.)
    //burada getCategroiesSuccess action'ını değil de bir fonksiyon göndermemizin sebebi redux-thunk
    //redux-thunk sayesinde action yerine fonksiyon göndererek işlem yapabiliyoruz.
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
//mapStateToProps = map ile stateleri al ve CategoryList componentinin propslarına connect ile bağla.
//connect işlemi componentleri redux a bağlamak için kullanılır
