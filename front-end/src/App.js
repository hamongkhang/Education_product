import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
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
    <>
    <div className="max-w-screen-2xl my-0 mx-auto bg-gray-100">
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
    </div>
    </>
  );
}
 
export default App;
