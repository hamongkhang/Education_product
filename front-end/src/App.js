import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './views/home'
import { Login, Register, ForgotPassword, CodeVerification, ResetPassword } from './components/account'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Cart from './components/cart';
import Header from './components/header';
import Footer from './components/footer';
import Books from './views/books'
import SearchBox from './components/searchBox';
import Call from './components/call';
import Chat from './components/chat';
import Articles from './views/articles';
import Courses from './views/courses';
import CourseDetails from './views/courseDetails'

function App() {
  return (
    <div className="max-w-screen-2xl my-0 mx-auto">
      <div className="my-0 mx-auto relative">
        <Router>
          <Header/>
          <Switch>
            <Route path="/dang-ky" exact component={Register} />
            <Route path="/dang-nhap" exact component={Login} />
            <Route path="/quen-mat-khau" exact component={ForgotPassword} />
            <Route path="/xac-nhan-ma" exact component={CodeVerification} />
            <Route path="/dat-lai-mat-khau" exact component={ResetPassword} />
            <Route path="/sach" exact component={Books} />
            <Route path="/khoa-hoc/khoa-hoc-1" exact component={CourseDetails} />
            <Route path="/khoa-hoc" exact component={Courses} />
            <Route path="/tin-tuc" exact component={Articles} />
            <Route path="/" exact component={Home} />
          </Switch>
          <Cart/>
          <SearchBox/>
          <Call/>
          <Chat/>
          <Footer/>
        </Router>
      </div>
    </div>
  );
}
 
export default App;
