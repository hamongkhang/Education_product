import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, HashRouter } from 'react-router-dom'
import HomePages from './layouts/home'
import Admin from './layouts/admin';
import UserProfile from './views/home/userProfile';
import PlayCourse from './views/home/playCourse';
import LoginAdmin from './views/admin/account/login';

function App() {
  const [render, setRender] = useState(false);
  const changeRender =()=>{
    console.log('đã được render lại');
    setRender(!render);
  }
  return (
    <>
      <Router>
        <Switch>  
          <Route path="/admin" exact component={LoginAdmin} />
          <Route path="/admin/:path" component={Admin} />
          <Route path="/tai-khoan" component={UserProfile} />
          <Route path="/bai-hoc/:id" component={PlayCourse} />
          <Route path="/" component={() => <HomePages changeRender={changeRender} />} />
        </Switch>
      </Router>
    </>
  );
}
 
export default App;
