import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './views/home'
import Login from './components/Login'
import Register from './components/Register'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Cart from './components/cart';
import Header from './components/header';
function App() {
  return (
    <div className="max-w-screen-2xl my-0 mx-auto">
      <div className="my-0 mx-auto relative">
        <Router>
          <Header/>
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
          <Cart/>
        </Router>
      </div>
    </div>
  );
}
 
export default App;
