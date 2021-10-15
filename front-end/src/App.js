import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
<<<<<<< HEAD
import HomePages from './views/home'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Footer from './components/footer';
import Call from './components/call';
import Chat from './components/chat';
import SearchBox from './components/searchBox';
import Cart from './components/cart';
import UserProfile from './views/home/userProfile';
import PlayCourse from './views/home/playCourse';

function App() {
  return (
    <div className="max-w-screen-2xl my-0 mx-auto">
      <div className="my-0 mx-auto relative">
        <Router>
          <Switch>
            <Route path="/tai-khoan" component={UserProfile} />
            <Route path="/bai-hoc" exact component={PlayCourse} />
            <Route path="/" component={HomePages} />
          </Switch>
          <Call/>
          <Chat/>
          <Cart/>
          <SearchBox/>
          <Footer/>
        </Router>
      </div>
=======
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
>>>>>>> Other_document
    </div>
  );
}
 
export default App;
