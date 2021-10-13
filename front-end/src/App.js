import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import { Other_document } from './components/Other_document';
function App() {
  return (
    <div className="container-fluid">
      <Router>
        <div className="menu-top">
            <div className="btnHome">
                <Link to="/" style={{backgroundImage:`url(${process.env.PUBLIC_URL + '/bg-menu-top.png'})`}}></Link>
            </div>
            <div className="menu">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to='/other-document'>Other Document</Link>
            </div>
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path='/other-document' component={Other_document} />
        </Switch>
      </Router>
    </div>
  );
}
 
export default App;
