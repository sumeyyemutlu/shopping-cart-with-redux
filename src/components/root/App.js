import React from 'react'
import { Container } from 'reactstrap';
import Dashboard from './Dashboard';
import Navi from '../navi/Navi'
import {Switch, Route} from 'react-router-dom'
import CartDetail from '../cart/CartDetail';

function App() {
  return (
    <Container> 
      <Navi />
      <Switch>
        <Route path="/" exact component ={Dashboard} />{
          //dashboardın içinde categorylist ve productlist var ana sayfada bunlar görünecek.
          //aynı zamanda aşağıda product sayfasında da dashboard görünecek
        }
        <Route path="/product" exact component ={Dashboard} />
        <Route path="/cart" exact component ={CartDetail} />
      </Switch>
    </Container>
  );
}

export default App;
